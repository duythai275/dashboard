import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import { pull } from "../../utils";
import PieChart from "@/components/Widgets/PieChart";
import useMetadataStore from "@/state/metadata";

const Widget9 = ({ setLoading }) => {
  const { indicators } = useMetadataStore((state) => ({
    indicators: state.fhisIndicators,
  }));
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget9Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        value: row[1],
        dx: row[0],
      }));
      response.dx = resultData.data.metaData.dimensions.dx.map((item) => {
        return item;
      });
      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      setData({
        labels: result.dx.map((dx) => {
          const foundIndicator = indicators.find(
            (indicator) => indicator.id === dx
          );
          const indicatorsName =
            localeName === "En" ? foundIndicator.nameEn : foundIndicator.nameLo;
          return indicatorsName;
        }),
        datasets: [
          {
            label: "",
            data: result.dx.map((dx) => {
              const foundRow = result.data.filter((row) => row.dx === dx);

              return foundRow.length
                ? foundRow.reduce(
                    (prev, curr) => prev + (curr.value * 1 || 0),
                    0
                  )
                : 0;
            }),
            backgroundColor: [
              "#A8BF24",
              "#518CC3",
              "#D74554",
              "#FFA025",
              "#968F8F",
              "#BB3FA3",
            ],
          },
        ],
      });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  const formatLabel = (chart, index) => {
    const localeName = i18n.language === "en" ? "En" : "Lo";
    const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    const percent = ((chart.data.datasets[0].data[index] * 100) / sum).toFixed(
      2
    );
    const foundIndicator = indicators.find(
      (indicator) => indicator.id === result.dx[index]
    );
    const indicatorsName =
      localeName === "En" ? foundIndicator.nameEn : foundIndicator.nameLo;
    const dataValue = chart.data.datasets[0].data[index];
    return `${indicatorsName}: ${dataValue}(${percent}%)`;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: [t("widget4.9Title"), "2019 - Lao PDR"],
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
      pieLabelsLine: {
        display: true,
        text: formatLabel,
        font: {
          size: 13,
        },
      },
    },
  };

  return data && <PieChart data={data} options={options} />;
};
export default withWidgetChildrenLoader(Widget9);

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";

const Widget8 = ({ setLoading }) => {
  const { orgUnits, dataSets } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    dataSets: state.hmisDataSets,
  }));
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard2Widget8Data");
      const response = {};

      response.data = resultData.data.rows.map((row) => ({
        dx: row[0],
        value: row[2],
        ou: row[1],
      }));
      response.ou = resultData.data.metaData.dimensions.ou
        .map((item) => {
          const foundOu = orgUnits.find((ou) => ou.id === item);
          return foundOu;
        })
        .filter((item) => item);
      response.dx = [];
      resultData.data.metaData.dimensions.dx.forEach((item) => {
        const reportingText = item.split(".")[1];
        if (!response.dx.includes(reportingText)) {
          response.dx.push(reportingText);
        }
      });

      setResult(response);
      setLoading(false);
    })();
  }, [additionalState.widget14_15_17Dashboard2Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";

      const colors = ["#A8BF24", "#5790C6", "#D52E45", "#FF9E21"];
      let currentData = {};

      currentData.labels = result.ou.map((ou) => {
        return localeName === "En" ? ou.nameEn : ou.nameLo;
      });
      currentData.datasets = result.dx.map((dx, index) => ({
        label: t(dx),
        data: result.ou.map((ou) => {
          const foundRow = result.data.filter(
            (row) => row.ou === ou.id && row.dx.split(".")[1] === dx
          );

          return foundRow.length
            ? foundRow
                .reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
                .toFixed(1)
            : 0;
        }),
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 18,
    },
    scales: {
      y: {
        max: 150,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return context[0].label.replaceAll(",", "");
          },
        },
      },
      legend: {
        position: "bottom",
      },
      datalabels: {
        anchor: "end",
        align: "end",
        offset: -5,
        color: "#fff",
        borderColor: "#000",
        textStrokeColor: "black", // <-- added this
        textStrokeWidth: 3, // <-- added this,
        font: {
          size: 12,
        },
      },
    },
  };

  return data && <BarChart data={data} customOptions={options} />;
};
export default withWidgetChildrenLoader(Widget8);

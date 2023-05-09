import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";

const Widget5 = ({ setLoading }) => {
  const { orgUnits, indicators, dataItems } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    indicators: state.fhisIndicators,
    dataItems: state.fhisDataItems,
  }));
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const listPe = [];
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    while (true) {
      if (listPe.length === 12) {
        break;
      }
      listPe.push(`${year}${month < 10 ? `0${month}` : month}`);
      if (month === 1) {
        month = 12;
        year -= 1;
      } else {
        month -= 1;
      }
    }
    return listPe;
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard4Widget5Data");
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

      const colors = ["#4292C6", "#67000D", "#FCBBA1"];
      let currentData = {};

      const dataMappingAlongOu = result.ou
        .map((ou) => {
          const foundRow = result.data.filter(
            (row) => row.ou === ou.id && row.dx === "zXwbQ7jd7mw"
          );

          return {
            data: foundRow.length
              ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
              : 0,
            ou,
          };
        })
        .sort((a, b) => b.data - a.data);

      currentData.labels = dataMappingAlongOu.map((item) => {
        return localeName === "En" ? item.ou.nameEn : item.ou.nameLo;
      });
      currentData.datasets = result.dx.map((dx, index) => ({
        label: (() => {
          const foundIndicator = indicators.find(
            (indicator) => indicator.id === dx
          );

          const foundDataItems = dataItems.find(
            (dataItem) => dataItem.id === dx
          );
          if (foundIndicator) {
            const name =
              localeName === "En"
                ? foundIndicator?.nameEn
                : foundIndicator?.nameLo;
            return `${name}`;
          }

          const name =
            localeName === "En"
              ? foundDataItems?.nameEn
              : foundDataItems?.nameLo;
          return `${name}`;
        })(),
        data: dataMappingAlongOu.map((item) => {
          const foundRow = result.data.filter(
            (row) => row.ou === item.ou.id && row.dx === dx
          );

          return foundRow.length
            ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
            : 0;
        }),
        borderColor: colors[index],
        backgroundColor: colors[index],
        yAxisID: dx === "zXwbQ7jd7mw" ? "A" : "B",
      }));
      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      A: {
        type: "linear",
        position: "left",
        ticks: {
          stepSize: 30,
        },
      },
      B: {
        type: "linear",
        position: "right",
        ticks: {
          callback: function (value, index, ticks) {
            if (value < 300000) {
              return;
            }
            return `${value / 1000}k`;
          },
          stepSize: 300000,
        },
      },
    },

    plugins: {
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
          size: 10,
        },
      },
    },
  };

  return data && <BarChart data={data} customOptions={options} />;
};
export default withWidgetChildrenLoader(Widget5);

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";

const colors = [
  "#A8BF24",
  "#518CC3",
  "#D74554",
  "#FF9E21",
  "#968F8F",
  "#BA3BA1",
  "#FFDA54",
];

const Widget4 = ({ setLoading }) => {
  const { orgUnits, dataSets } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    dataSets: state.hmisDataSets,
  }));
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard6Widget4Data");
      const response = {};
      console.log(resultData.data);
      response.data = resultData.data.rows.map((row) => ({
        item: row[0],
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
        const foundDataSet = dataSets.find(
          (dataSet) => dataSet.id === item.split(".")[0]
        );
        return { ...foundDataSet, reportingType: t(item.split(".")[1]) };
      });
      setResult(response);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      let currentData = {};
      currentData.labels = result.ou.map((ou) => {
        return localeName === "En" ? ou.nameEn : ou.nameLo;
      });
      currentData.datasets = result.dx.map((dx, index) => ({
        label:
          localeName === "En"
            ? `${dx.nameEn} ${dx.reportingType}`
            : `${dx.nameLo} ${dx.reportingType}`,
        data: result.ou.map((ou) => {
          const foundRow = result.data.filter(
            (row) =>
              row.ou === ou.id && row.item === `${dx.id}.${dx.reportingType}`
          );
          return foundRow.length
            ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
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
    plugins: {
      lineAt: {
        lineAt: 95,
        thickness: 2,
        color: "black",
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
          size: 10,
        },
      },
    },
  };
  return data && <BarChart data={data} customOptions={options} />;
};
export default withWidgetChildrenLoader(Widget4);

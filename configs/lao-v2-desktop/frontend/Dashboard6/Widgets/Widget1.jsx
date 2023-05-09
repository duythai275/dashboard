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

const Widget1 = ({ setLoading }) => {
  const { orgUnits, dataItems } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    dataItems: state.hmisDataItems,
  }));
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard6Widget1Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        item: row[0],
        value: row[1],
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
      let currentData = {};
      currentData.labels = ["Lao PDR"];
      currentData.datasets = result.dx.map((dx, index) => ({
        label:
          localeName === "En"
            ? dataItems.find((dataItem) => dataItem.id === dx).nameEn
            : dataItems.find((dataItem) => dataItem.id === dx).nameLo,
        data: [result.data.find((row) => row.item === dx)?.value * 1 || 0],
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget1);

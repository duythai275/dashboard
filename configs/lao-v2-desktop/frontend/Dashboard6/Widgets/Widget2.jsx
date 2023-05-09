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

const Widget2 = ({ setLoading }) => {
  const { orgUnits, indicators } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
    indicators: state.hmisIndicators,
  }));
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard6Widget2Data");
      const response = {};
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
      currentData.datasets = [
        {
          label:
            localeName === "En"
              ? indicators.find(
                  (indicator) => indicator.id === result.data[0].item
                ).nameEn
              : indicators.find(
                  (indicator) => indicator.id === result.data[0].item
                ).nameLo,
          data: result.ou.map((ou) => {
            const foundRow = result.data.filter((row) => row.ou === ou.id);
            return foundRow.length
              ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
              : 0;
          }),
          borderColor: colors[0],
          backgroundColor: colors[0],
        },
      ];

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget2);

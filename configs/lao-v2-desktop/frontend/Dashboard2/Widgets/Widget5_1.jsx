import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { getMonthName } from "../../Dashboard1/common/function/getMonthName";
import moment from "moment";

const Widget5_1 = ({ setLoading }) => {
  const { orgUnits } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
  }));
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const listPe = [];
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    for (let i = 1; i <= month; i++) {
      listPe.push(`${year}${i > 9 ? i : `0${i}`}`);
    }
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget14_15_16Dashboard2Ready) {
      const response = {};
      response.data = additionalState.widget14_15_16Dashboard2Data.rows
        .map((row) => ({
          pe: row[1],
          item: row[0],
          value: parseInt(row[3]),
          ou: row[2],
        }))
        .filter((row) => listTargetPe.includes(row.pe));
      response.ou =
        additionalState.widget14_15_16Dashboard2Data.metaData.dimensions.ou
          .map((item) => {
            const foundOu = orgUnits.find(
              (ou) =>
                ou.id === item &&
                ou.oug.find((ougItem) => ougItem.id === "jblbYwuvO33")
            );
            return foundOu;
          })
          .filter((item) => item);

      setResult(response);
    }
    setLoading(!additionalState.widget14_15_16Dashboard2Ready);
  }, [additionalState.widget14_15_16Dashboard2Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const listMonth = listTargetPe.map((item) => {
        const month = item.slice(4);
        return month;
      });
      const colors = ["#A8BF23", "#5790C6", "#D52E45"];
      let currentData = {};

      currentData.labels = result.ou.map((ou) => {
        return localeName === "En" ? ou.nameEn : ou.nameLo;
      });
      currentData.datasets = [
        {
          label: t("widget2.5.1LegendTitle"),
          data: result.ou.map((ou) => {
            const foundRow = result.data.filter(
              (row) => row.ou === ou.id && listMonth.includes(row.pe.slice(4))
            );
            return foundRow.length
              ? foundRow.reduce((prev, curr) => prev + (curr.value * 1 || 0), 0)
              : 0;
          }),
          borderColor: "#A8BF23",
          backgroundColor: "#A8BF23",
        },
      ];

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget5_1);

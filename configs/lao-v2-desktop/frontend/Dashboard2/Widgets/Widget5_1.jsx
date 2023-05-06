import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { getMonthName } from "../../Dashboard1/common/function/getMonthName";

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
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    while (true) {
      if (listPe.length === 3) {
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
    if (additionalState.widget1457Dashboard2Ready) {
      const response = {};
      response.data = additionalState.widget1457Dashboard2Data.rows
        .map((row) => ({
          pe: row[1],
          item: row[0],
          value: parseInt(row[3]),
          ou: row[2],
        }))
        .filter((row) => listTargetPe.includes(row.pe));
      response.ou =
        additionalState.widget1457Dashboard2Data.metaData.dimensions.ou
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
    setLoading(!additionalState.widget1457Dashboard2Ready);
  }, [additionalState.widget1457Dashboard2Ready]);

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
      currentData.datasets = listMonth.map((month, index) => ({
        label: getMonthName(
          month * 1,
          localeName === "En" ? "en-US" : localeName
        ),
        data: result.ou.map((ou) => {
          const foundRow = result.data.filter(
            (row) => row.ou === ou.id && row.pe.includes(month)
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

  return data && <BarChart data={data} />;
};
export default withWidgetChildrenLoader(Widget5_1);

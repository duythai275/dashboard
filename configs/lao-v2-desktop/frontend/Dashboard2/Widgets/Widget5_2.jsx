import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { getMonthName } from "../../Dashboard1/common/function/getMonthName";
import { pull } from "../../utils";

const Widget5_2 = ({ setLoading }) => {
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
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard2Widget5_2Data");
      const response = {};
      console.log(resultData.data);
      response.data = resultData.data.rows
        .map((row) => ({
          pe: row[1],
          item: row[0],
          value: parseInt(row[3]),
          ou: row[2],
        }))
        .filter((row) => listTargetPe.includes(row.pe));
      response.ou = resultData.data.metaData.dimensions.ou
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
      setLoading(false);
    })();
  }, []);

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
            (row) => row.ou === ou.id && row.pe.slice(4) === month
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
export default withWidgetChildrenLoader(Widget5_2);

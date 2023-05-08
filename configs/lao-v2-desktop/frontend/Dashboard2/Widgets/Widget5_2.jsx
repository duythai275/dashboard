import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import BarChart from "@/components/Widgets/BarChart";
import useMetadataStore from "@/state/metadata";
import { getMonthName } from "../../Dashboard1/common/function/getMonthName";
import { pull } from "../../utils";
import moment from "moment";

const Widget5_2 = ({ setLoading }) => {
  const { orgUnits } = useMetadataStore((state) => ({
    orgUnits: state.hmisOrgUnits,
  }));
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const lastMonth = useMemo(() => {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (month === 1) {
      return `${year - 1}12`;
    }
    return `${year}${month - 1 >= 10 ? month - 1 : `0${month - 1}`}`;
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resultData = await pull("/api/getDashboard2Widget5_2Data");
      const response = {};
      response.data = resultData.data.rows.map((row) => ({
        pe: row[1],
        item: row[0],
        value: parseInt(row[3]),
        ou: row[2],
      }));
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
      let currentData = {};

      currentData.labels = result.ou.map((ou) => {
        return localeName === "En" ? ou.nameEn : ou.nameLo;
      });
      currentData.datasets = [
        {
          label: getMonthName(
            moment().month() || 12,
            localeName === "En" ? "en-US" : localeName
          ),
          data: result.ou.map((ou) => {
            const foundRow = result.data.filter((row) => row.ou === ou.id);
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
export default withWidgetChildrenLoader(Widget5_2);

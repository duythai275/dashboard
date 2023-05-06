import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";

import { getMonthName } from "../../Dashboard1/common/function/getMonthName";

const Widget4_2 = ({ setLoading }) => {
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    const listPe = [];
    const month = moment().month() + 1;
    const year = moment().year();
    for (let i = 0; i <= 2; i++) {
      for (let j = i > 0 ? 12 : month; j >= 1; j--) {
        listPe.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
      }
    }
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget34_25_26Dashboard2Ready) {
      const response = {};
      response.data = additionalState.widget34_25_26Dashboard2Data.rows.map(
        (row) => ({
          pe: row[1],
          item: row[0],
          value: parseInt(row[3]),
        })
      );
      response.pes =
        additionalState.widget34_25_26Dashboard2Data.metaData.dimensions.pe
          .filter((item) => {
            if (listTargetPe.includes(item)) {
              return item;
            }
          })
          .reverse();
      setResult(response);
    }
    setLoading(!additionalState.widget34_25_26Dashboard2Ready);
  }, [additionalState.widget34_25_26Dashboard2Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const localeName = i18n.language === "en" ? "En" : "Lo";
      const currentYear = moment().year();
      const listYear = [
        `${currentYear - 2}`,
        `${currentYear - 1}`,
        `${currentYear}`,
      ];
      const colors = ["#A8BF23", "#5790C6", "#D52E45"];
      let currentData = {};
      const listMonth = () => {
        const resultMonth = [];
        for (let i = 1; i <= 12; i++) {
          resultMonth.push(i < 10 ? `0${i}` : `${i}`);
        }
        return resultMonth;
      };
      currentData.labels = listMonth().map((month) => {
        return getMonthName(
          month * 1,
          localeName === "En" ? "en-US" : localeName
        );
      });
      currentData.datasets = listYear.map((year, index) => ({
        label: year,
        data: listMonth().map((month) => {
          const foundRow = result.data.filter(
            (row) => row.pe.includes(month) && row.pe.includes(year)
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

  return data && <LineChart data={data} />;
};
export default withWidgetChildrenLoader(Widget4_2);

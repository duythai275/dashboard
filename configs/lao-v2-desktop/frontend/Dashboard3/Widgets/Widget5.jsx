import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { months } from "../common/constant/dataItem";
import { WIDGET_5_DASHBOARD_3_COLORS } from "../common/constant/color";

const Widget5 = ({ setLoading, dataItemId }) => {
  const { hmisDataItems } = useMetadataStore(
    (state) => ({ hmisDataItems: state.hmisDataItems }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const listTargetPe = useMemo(() => {
    let listPe = [];
    let year = new Date().getFullYear();
    for (let i = 0; i <= 2; i++) {
      year -= i === 0 ? i : 1;
      let object = {
        year: year,
        months: [],
      };
      for (let y = 1; y <= 12; y++) {
        object.months.push(`${year}${y < 10 ? `0${y}` : y}`);
      }
      listPe.push(object);
    }
    listPe = listPe.reverse();
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget1Dashboard3Ready) {
      const response = {
        data: [],
      };
      listTargetPe.forEach((pe) => {
        let object = {
          label: pe.year,
          data: [],
        };
        pe.months.forEach((month) => {
          const findData = additionalState.widget1Dashboard3Data.rows.filter(
            (row) => row[1] === month && row[0] === dataItemId
          );
          if (findData.length > 0) {
            let total = 0;
            findData.forEach((da) => {
              total = total + da[3] * 1;
            });
            object.data.push(total);
          } else {
            object.data.push(null);
          }
        });
        response.data.push(object);
      });
      setResult(response);
    }
    setLoading(!additionalState.widget1Dashboard3Ready);
  }, [additionalState.widget1Dashboard3Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      //const localeName = i18n.language === "en" ? "En" : "Lo";
      const colors = WIDGET_5_DASHBOARD_3_COLORS;
      let currentData = {};
      currentData.labels = months.map((pe) => {
        return t(pe);
      });
      currentData.datasets = result.data.map((di, index) => ({
        label: di.label,
        data: di.data,
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <LineChart data={data} />;
};
export default withWidgetChildrenLoader(Widget5);

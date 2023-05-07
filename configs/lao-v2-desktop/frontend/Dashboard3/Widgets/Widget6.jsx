import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { WIDGET_5_DASHBOARD_3_COLORS } from "../common/constant/color";
import { provinces } from "../common/constant/dataItem";

const Widget6 = ({ setLoading, dataItemId }) => {
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
    let month = new Date().getMonth() + 1;
    for (let i = 0; i <= 2; i++) {
      month -= i === 0 ? i : 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
      listPe.push(`${year}${month < 10 ? `0${month}` : month}`);
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
          label: pe,
          data: [],
        };
        additionalState.widget1Dashboard3Data.metaData.dimensions.ou.forEach(
          (org) => {
            if (provinces.includes(org)) {
              const findData = additionalState.widget1Dashboard3Data.rows.find(
                (row) =>
                  row[0] === dataItemId && row[2] === org && row[1] === pe
              );
              if (findData) {
                object.data.push(parseInt(findData[3]));
              } else {
                object.data.push(0);
              }
            }
          }
        );
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
      currentData.labels = [];
      additionalState.widget1Dashboard3Data.metaData.dimensions.ou.forEach(
        (org) => {
          if (provinces.includes(org)) {
            currentData.labels.push(
              additionalState.widget1Dashboard3Data.metaData.items[org].name
            );
          }
        }
      );
      currentData.datasets = result.data.map((di, index) => ({
        label:
          additionalState.widget1Dashboard3Data.metaData.items[di.label].name,
        data: di.data,
        borderColor: colors[index],
        backgroundColor: colors[index],
      }));

      setData({ ...currentData });
    })();
  }, [i18n.language, JSON.stringify(result)]);

  return data && <LineChart data={data} />;
};
export default withWidgetChildrenLoader(Widget6);

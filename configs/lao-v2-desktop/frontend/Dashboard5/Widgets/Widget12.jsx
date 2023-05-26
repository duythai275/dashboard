import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import LineChart from "@/components/Widgets/LineChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { months } from "../common/constant/dataItem";
import { WIDGET_12_DASHBOARD_5_COLORS } from "../common/constant/color";

const Widget12 = ({ setLoading, dataItemId }) => {
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
    if (additionalState.widgetDashboard5Ready) {
      const response = {
        data: [],
      };
      listTargetPe.forEach((pe) => {
        let object = {
          label: pe.year,
          data: [],
        };
        pe.months.forEach((month) => {
          const findData = additionalState.widgetDashboard5Data.rows.filter(
            (row) => row[2] === month && dataItemId.includes(row[0])
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
    setLoading(!additionalState.widgetDashboard5Ready);
  }, [additionalState.widgetDashboard5Ready]);

  useEffect(() => {
    if (!result) return;

    (async () => {
      const colors = WIDGET_12_DASHBOARD_5_COLORS;
      let currentData = {};
      currentData.labels = months.map((pe) => {
        console.log(pe)
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

  return (
    data && (
      <LineChart
        data={data}
        customOptions={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 18,
          },
          plugins: {
            legend: {
              position: "bottom",
              display: false,
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
        }}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget12);

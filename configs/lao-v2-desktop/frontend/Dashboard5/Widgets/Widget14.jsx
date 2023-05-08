import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
import BarChart from "@/components/Widgets/BarChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { WIDGET_14_DASHBOARD_5_COLORS } from "../common/constant/color";

const Widget14 = ({ setLoading, dataItemId }) => {
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();

  const currentDate = useMemo(() => format(new Date(), "dd/MM/yyyy"), []);

  const listTargetPe = useMemo(() => {
    const currentYear = [],
      lastYear = [];
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    for (let i = 1; i < month; i++) {
      currentYear.push(`${year}${i > 9 ? i : `0${i}`}`);
      lastYear.push(`${year - 1}${i > 9 ? i : `0${i}`}`);
    }
    return { currentYear, lastYear };
  }, []);

  useEffect(() => {
    if (additionalState.widgetDashboard5Ready) {
      const response = {};
      response.data = additionalState.widgetDashboard5Data.rows
        .filter(
          (row) =>
            listTargetPe.currentYear.includes(row[2]) &&
            dataItemId.includes(row[0])
        )
        .map((row) => ({
          pe: row[2],
          de: row[0],
          value: parseInt(row[3]),
        }));
      setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5Ready);
  }, [additionalState.widgetDashboard5Ready]);

  useEffect(() => {
    if (!result) return;
    const currentData = {
      labels: [],
      datasets: [],
    };

    let object = {
      label: "Diseases",
      data: [],
    };

    dataItemId.forEach((item) => {
      const findLabel = Object.entries(
        additionalState.widgetDashboard5Data.metaData.items
      ).find((e) => {
        if (e[1].code) {
          if (e[1].code === item) {
            return e;
          }
        }
      });
      currentData.labels.push(findLabel ? findLabel[1].name : "");

      let total = 0;
      total = result.data
        .filter((e) => {
          if (e.de === item) {
            return item;
          }
        })
        .reduce((prev, curr) => prev + (curr?.value * 1 || 0), 0);
      object.data.push(total);
    });

    currentData.datasets.push(object);
    const colors = WIDGET_14_DASHBOARD_5_COLORS;
    let chartData = {};
    chartData.labels = currentData.labels.map((e) => {
      return t(e);
    });
    chartData.datasets = currentData.datasets.map((di, index) => ({
      label: di.label,
      data: di.data,
      borderColor: colors[index],
      backgroundColor: colors[index],
    }));
    setData({ ...chartData });
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <BarChart
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

export default withWidgetChildrenLoader(Widget14);

import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useDashboardStore from "@/state/dashboard";
import { pull } from "@/utils/fetch";
import { findHeaderIndex } from "../../../utils";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { getISOWeek } from "date-fns";
import LineChart from "@/components/Widgets/LineChart";

const Widget1 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, dengueDataReady, dengueData } = additionalState;

  const [data, setData] = useState(null);

  const currentYear = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  const currentWeek = useMemo(() => {
    return getISOWeek(new Date());
  }, []);

  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);

  const listLast5Year = useMemo(() => {
    if (!selectedPeriod) return null;
    let result = [];
    let currentYear = selectedPeriod;
    while (currentYear >= 2011 && result.length < 6) {
      result.push(currentYear);
      currentYear--;
    }
    return result;
  }, [selectedPeriod]);

  useEffect(() => {
    setLoading(!dengueDataReady);
    if (dengueDataReady) {
      const currentData = {};
      currentData.labels = weeks.map((week) =>
        t("labelWidget1", { week: week.slice(1) })
      );
      currentData.datasets = listLast5Year.map((year, index) => ({
        type: "line",
        label: t("legendWidget1DengueDashboard", { year }),
        backgroundColor: listColors[index],
        data: weeks.map((week) => {
          const weekNumber = week.slice(1) * 1;
          if (year === currentYear && weekNumber > currentWeek) {
            return null;
          }
          const foundData = dengueData.case.find(
            (item) => item.period === `${year}${week}`
          );
          return foundData?.value || 0;
        }),
        pointBorderWidth: 0,
        borderColor: listColors[index],
        borderWidth: 2,
        tension: 0.4,
        ...listLineStyle[index],
      }));
      setData(currentData);
    }
  }, [dengueDataReady]);

  if (!data) return null;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 18,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          useLineStyle: true,
          //   pointStyle: "line",
          boxHeight: 0,
        },
      },
      datalabels: {
        display: false,
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
  };

  return <LineChart data={data} customOptions={options} />;
};

export default withWidgetChildrenLoader(Widget1);

const listColors = [
  "#FF0000",
  "#FAC090",
  "#4990A4",
  "#00B050",
  "#7030A0",
  "#C72020",
];

const listLineStyle = [
  {
    pointRadius: 3,
    borderDash: [0, 0],
    borderCapStyle: "butt",
    borderWidth: 2,
  },
  {
    pointRadius: 0,
    borderDash: [0, 0],
    borderCapStyle: "butt",
    borderWidth: 2,
  },
  {
    pointRadius: 0,
    borderDash: [0, 0],
    borderCapStyle: "butt",
    borderWidth: 2,
  },
  {
    pointRadius: 0,
    borderDash: [0, 0],
    borderCapStyle: "butt",
    borderWidth: 2,
  },
  {
    borderDash: [7, 15],
    pointRadius: 0,
    borderCapStyle: "butt",
    borderWidth: 2,
  },
  {
    borderDash: [1, 15],
    borderCapStyle: "round",
    borderWidth: 3,
    pointRadius: 0,
  },
];

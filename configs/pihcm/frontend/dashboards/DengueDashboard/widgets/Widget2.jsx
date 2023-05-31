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

const Widget2 = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedPeriod, selectedOrgUnit } = additionalState;

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
    if (!listLast5Year || !selectedOrgUnit) return;
    (async () => {
      try {
        setLoading(true);
        const listPeriod = listLast5Year
          .map((year) => weeks.map((week) => `${year}${week}`))
          .flat();
        const result = await pull(
          `/api/analytics?dimension=dx:mVrQMb86ESf,pe:${listPeriod.join(
            ";"
          )}&filter=ou:${
            selectedOrgUnit?.id
          }&displayProperty=NAME&includeNumDen=false&skipMeta=false&skipData=false`
        );
        if (result) {
          const periodIndex = findHeaderIndex(result.headers, "pe");
          const valueIndex = findHeaderIndex(result.headers, "value");

          const dataResult = result.rows.map((row) => ({
            period: row[periodIndex],
            value: row[valueIndex] * 1,
          }));
          const currentData = {};
          currentData.labels = weeks.map((week) =>
            t("labelWidget1", { week: week.slice(1) })
          );
          currentData.datasets = listLast5Year.map((year, index) => ({
            type: "line",
            label: t("legendWidget2DengueDashboard", { year }),
            backgroundColor: listColors[index],
            data: weeks.map((week) => {
              const weekNumber = week.slice(1) * 1;
              const getTotal = (array) => {
                return array.reduce(
                  (prev, curr) => prev + (curr.value * 1 || 0),
                  0
                );
              };
              if (year === currentYear && weekNumber > currentWeek) {
                return null;
              }
              const foundData = dataResult.filter((item) => {
                const weekPeriod = item.period.slice(5) * 1;
                const yearPeriod = item.period.slice(0, 4) * 1;
                if (yearPeriod === year && weekPeriod <= weekNumber) {
                  return item;
                }
              });
              return getTotal(foundData);
            }),
            pointBorderWidth: 0,
            borderColor: listColors[index],
            borderWidth: 2,
            tension: 0.4,
            ...listLineStyle[index],
          }));
          setData(currentData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [listLast5Year, selectedOrgUnit?.id]);

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
          size: 12,
        },
      },
    },
  };

  return <LineChart data={data} customOptions={options} />;
};

export default withWidgetChildrenLoader(Widget2);

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

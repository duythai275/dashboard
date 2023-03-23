import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";

const Widget1 = ({ setLoading, code, ou }) => {
  const [data, setData] = useState(null);
  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);

  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());

  const getData = async () => {
    try {
      setLoading(true);
      if (ou === "S3kaCiYIP4B") {
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_country&var=startYear:${lastYear}&var=endYear:${currentYear}`
        );
        if (result) {
          const weeklyIndex = result.listGrid.headers.findIndex(
            (header) => header.name === "weekly"
          );
          const diseaseIndex = result.listGrid.headers.findIndex(
            (header) => header.name === "Du5ydup8qQf"
          );
          const casesIndex = result.listGrid.headers.findIndex(
            (header) => header.name === "cases"
          );

          const dataLastYearResult = weeks.map((week) => {
            return (
              result.listGrid.rows.find(
                (row) =>
                  row[weeklyIndex].slice(4) === week &&
                  row[diseaseIndex] === code &&
                  row[weeklyIndex].slice(0, 4) * 1 === lastYear
              )?.[casesIndex] * 1 || 0
            );
          });
          const dataCurrentYearResult = weeks.map((week) => {
            return (
              result.listGrid.rows.find(
                (row) =>
                  row[weeklyIndex].slice(4) === week &&
                  row[diseaseIndex] === code &&
                  row[weeklyIndex].slice(0, 4) * 1 === currentYear
              )?.[casesIndex] * 1 || 0
            );
          });

          setData({
            lastYear: dataLastYearResult,
            currentYear: dataCurrentYearResult,
          });
        }
      } else {
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_provinces&var=startYear:${lastYear}&var=endYear:${currentYear}`
        );
        const ouIndex = result.listGrid.headers.findIndex(
          (header) => header.name === "uidlevel2"
        );
        const weeklyIndex = result.listGrid.headers.findIndex(
          (header) => header.name === "weekly"
        );
        const diseaseIndex = result.listGrid.headers.findIndex(
          (header) => header.name === "Du5ydup8qQf"
        );
        const casesIndex = result.listGrid.headers.findIndex(
          (header) => header.name === "cases"
        );

        const dataLastYearResult = weeks.map((week) => {
          return (
            result.listGrid.rows.find(
              (row) =>
                row[weeklyIndex].slice(4) === week &&
                row[diseaseIndex] === code &&
                row[weeklyIndex].slice(0, 4) * 1 === lastYear &&
                row[ouIndex] === ou
            )?.[casesIndex] * 1 || 0
          );
        });
        const dataCurrentYearResult = weeks.map((week) => {
          return (
            result.listGrid.rows.find(
              (row) =>
                row[weeklyIndex].slice(4) === week &&
                row[diseaseIndex] === code &&
                row[weeklyIndex].slice(0, 4) * 1 === currentYear &&
                row[ouIndex] === ou
            )?.[casesIndex] * 1 || 0
          );
        });
        setData({
          lastYear: dataLastYearResult,
          currentYear: dataCurrentYearResult,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [ou, code]);

  if (!data) return null;
  return (
    <MultitypeChart
      data={{
        labels: weeks,
        datasets: [
          {
            type: "line",
            label: currentYear,
            borderColor: "#9E0059",
            borderWidth: 3,
            fill: false,
            data: data.currentYear,
          },
          {
            type: "bar",
            label: lastYear,
            backgroundColor: "#0E79B2",
            data: data.lastYear,
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget1);

const weeks = [];

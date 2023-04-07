import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { pull } from "@/utils/fetch";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

//CHANGE WIDGET TITLE TO:
// Weekly {disease name} {province name(if select province)} cases
// Diễn biến bệnh {disease name} theo tuần {tại province name (if select province)}
const Widget1 = ({ setLoading, code, ou }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const weeks = useMemo(() => {
    let weeks = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(`W${i}`);
    }
    return weeks;
  }, []);
  const last5Year = useMemo(() => new Date().getFullYear() - 5, []);
  const lastYear = useMemo(() => new Date().getFullYear() - 1, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const getData = async () => {
    try {
      setLoading(true);
      if (ou === "S3kaCiYIP4B") {
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_country&var=startYear:${last5Year}&var=endYear:${currentYear}`
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

          const dataLast5YearResult = weeks.map((week) => {
            const value = result.listGrid.rows.filter(
              (row) =>
                row[weeklyIndex].slice(4) === week &&
                row[diseaseIndex] === code &&
                row[weeklyIndex].slice(0, 4) * 1 < currentYear
            );
            return Math.round(
              value.reduce(
                (prev, curr) => prev + (curr?.[casesIndex] * 1 || 0),
                0
              ) / 5
            );
          });

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
            last5Year: dataLast5YearResult,
            lastYear: dataLastYearResult,
            currentYear: dataCurrentYearResult,
          });
        }
      } else {
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_provinces&var=startYear:${last5Year}&var=endYear:${currentYear}`
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

        const dataLast5YearResult = weeks.map((week) => {
          const value = result.listGrid.rows.filter(
            (row) =>
              row[weeklyIndex].slice(4) === week &&
              row[diseaseIndex] === code &&
              row[weeklyIndex].slice(0, 4) * 1 < currentYear &&
              row[ouIndex] === ou
          );
          return Math.round(
            value.reduce(
              (prev, curr) => prev + (curr?.[casesIndex] * 1 || 0),
              0
            ) / 5
          );
        });

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
          last5Year: dataLast5YearResult,
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
        labels: weeks.map((week) => t("labelWidget1", { week: week.slice(1) })),
        datasets: [
          {
            type: "line",
            label: t("arithmeticMeanLast5Year"),
            backgroundColor: "#2C6693",
            data: data.last5Year,
            borderColor: "#2C6693",
            borderWidth: 2,
          },
          {
            type: "line",
            label: lastYear,
            backgroundColor: "#e08e31",
            data: data.lastYear,
            borderColor: "#e08e31",
            borderWidth: 2,
          },
          {
            type: "bar",
            label: currentYear,
            backgroundColor: "#85B15F",
            data: data.currentYear,
          },
        ],
      }}
    />
  );
};

export default withWidgetChildrenLoader(Widget1);

const weeks = [];

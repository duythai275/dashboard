import { useEffect, useMemo, useState } from "react";
import { getISOWeek } from "date-fns";
import _ from "lodash";
import { shallow } from "zustand/shallow";

import MultitypeChart from "@/components/Widgets/MultitypeChart";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { pull } from "@/utils/fetch";

const Widget1 = ({ setLoading, code, isUpto = false }) => {
  const { ouGroups } = useMetadataStore(
    (state) => ({ ouGroups: state.ouGroups }),
    shallow
  );
  const [data, setData] = useState(null);

  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());
  const currentWeek = useMemo(() => getISOWeek(new Date()));

  const getData = async () => {
    try {
      setLoading(true);

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

      const dataLastYearResult = {};
      const dataCurrentYearResult = {};

      result.listGrid.rows.forEach((row) => {
        const year = row[weeklyIndex].slice(0, 4) * 1;
        const week = row[weeklyIndex].slice(5) * 1;
        if (isUpto) {
          if (week > currentWeek || row[diseaseIndex] !== code) {
            return;
          }
          if (year === currentYear) {
            if (dataCurrentYearResult[row[ouIndex]]) {
              dataCurrentYearResult[row[ouIndex]] += row[casesIndex] * 1;
              return;
            }
            dataCurrentYearResult[row[ouIndex]] = row[casesIndex] * 1;
            return;
          }

          if (dataLastYearResult[row[ouIndex]]) {
            dataLastYearResult[row[ouIndex]] += row[casesIndex] * 1;
            return;
          }
          dataLastYearResult[row[ouIndex]] = row[casesIndex] * 1;
        } else {
          if (week !== currentWeek || row[diseaseIndex] !== code) {
            return;
          }
          if (year === currentYear) {
            if (dataCurrentYearResult[row[ouIndex]]) {
              dataCurrentYearResult[row[ouIndex]] += row[casesIndex] * 1;
              return;
            }
            dataCurrentYearResult[row[ouIndex]] = row[casesIndex] * 1;
            return;
          }

          if (dataLastYearResult[row[ouIndex]]) {
            dataLastYearResult[row[ouIndex]] += row[casesIndex] * 1;
            return;
          }
          dataLastYearResult[row[ouIndex]] = row[casesIndex] * 1;
        }
      });

      const dataResult = _.orderBy(
        Object.keys(dataCurrentYearResult).map((item) => ({
          id: item,
          value: dataCurrentYearResult[item] * 1 || 0,
        })),
        "value",
        "desc"
      ).slice(0, 10);

      const labels = dataResult.map((item) => item.id);

      setData({
        lastYear: labels.map((item) => dataLastYearResult[item] || 0),
        currentYear: dataResult.map((item) => item.value),
        labels,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [isUpto, code]);

  if (!data) return null;
  return (
    <MultitypeChart
      data={{
        labels: data.labels.map(
          (item) =>
            ouGroups[3].organisationUnits.find((ou) => ou.id === item)?.name
        ),
        datasets: [
          {
            type: "bar",
            label: lastYear,
            backgroundColor: "#e08e31",
            data: data.lastYear,
            borderColor: "white",
            borderWidth: 2,
          },
          {
            type: "bar",
            label: currentYear,
            backgroundColor: "#85B15F",
            data: data.currentYear,
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

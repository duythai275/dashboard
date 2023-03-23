import { useEffect, useMemo, useState } from "react";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { getISOWeek } from "date-fns";
import ThematicMap from "@/components/Widgets/ThematicMap";
import { shallow } from "zustand/shallow";
import { pull } from "@/utils/fetch";
import _ from "lodash";

const Widget4 = ({ setLoading, code, isUpto = false, isDeath = false }) => {
  const [data, setData] = useState(null);
  const { orgUnitGeoJson } = useMetadataStore(
    (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
    shallow
  );
  const features = orgUnitGeoJson
    ? orgUnitGeoJson.features.filter(
        (feature) => feature.properties.level === "2"
      )
    : [];
  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());
  const currentWeek = useMemo(() => getISOWeek(new Date()));
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_${
            isDeath ? "deaths" : "cases"
          }_provinces&var=startYear:${lastYear}&var=endYear:${currentYear}`
        );
        if (result) {
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
          const dataResult = {};

          result.listGrid.rows.forEach((row) => {
            const year = row[weeklyIndex].slice(0, 4) * 1;
            const week = row[weeklyIndex].slice(5) * 1;
            if (isUpto || isDeath) {
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
          _.union(
            Object.keys(dataLastYearResult),
            Object.keys(dataCurrentYearResult)
          ).forEach((ou) => {
            const lastYearValue = dataLastYearResult[ou] || 0;
            const currentYearValue = dataCurrentYearResult[ou] || 0;

            if (!lastYearValue) {
              dataResult[ou] = 100;
              return;
            }
            if (!currentYearValue) {
              dataResult[ou] = 0;
              return;
            }

            const changeValue = (currentYearValue / lastYearValue - 1) * 100;
            dataResult[ou] =
              changeValue >= 100
                ? 100
                : changeValue <= 0
                ? 0
                : Math.round(changeValue);
          });
          setData(dataResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [code, isUpto, isDeath]);
  return (
    data && (
      <ThematicMap
        features={features}
        data={data}
        // timeline={data && Object.keys(data).sort()}
        legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
        legendSet={[
          { color: "#689F38", max: 0, min: 0 },
          { color: "#AFB42B", max: 33, min: 1 },
          { color: "#FBC02D", max: 66, min: 34 },
          { color: "#F57C00", max: 99, min: 67 },
          { color: "#AC0800", max: 100, min: 100 },
        ]}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget4);

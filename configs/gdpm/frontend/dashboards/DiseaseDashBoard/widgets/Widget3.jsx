import { useEffect, useMemo, useState } from "react";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import { getISOWeek } from "date-fns";
import ThematicMap from "@/components/Widgets/ThematicMap";
import { shallow } from "zustand/shallow";

const Widget3 = ({ setLoading, code }) => {
  const [data, setData] = useState(null);
  const { orgUnitGeoJson } = useMetadataStore(
    (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
    shallow
  );
  console.log(orgUnitGeoJson);
  const features = orgUnitGeoJson
    ? orgUnitGeoJson.features.filter(
        (feature) => feature.properties.level === "2"
      )
    : [];
  const lastYear = useMemo(() => new Date().getFullYear() - 1);
  const currentYear = useMemo(() => new Date().getFullYear());
  const currentWeek = useMemo(() => getISOWeek(new Date()));
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        setLoading(true);
        const result = await pull(
          `/api/sqlViews/LEHkTysr0km/data?paging=false&var=table:_analytics_casereporting_cases_provinces&var=startYear:${lastYear}&var=endYear:${currentYear}`
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
          const dataResult = {};
          result.listGrid.rows.forEach((row) => {
            const year = row[weeklyIndex].slice(0, 4) * 1;
            const week = row[weeklyIndex].slice(5) * 1;
            if (year === currentYear || week > currentWeek) {
              return;
            }
            if (dataResult[row[ouIndex]]) {
              dataResult[row[ouIndex]] += row[casesIndex] * 1;
              return;
            }
            dataResult[row[ouIndex]] = row[casesIndex] * 1;
          });
          console.log(dataResult);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);
  return (
    data && (
      <ThematicMap
        features={features}
        data={data}
        // timeline={data && Object.keys(data).sort()}
        legend={["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"]}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget3);

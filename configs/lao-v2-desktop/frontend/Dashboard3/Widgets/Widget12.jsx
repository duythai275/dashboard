import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

import { WIDGET_12_DASHBOARD_3_LEGEND_COLORS } from "../common/constant/color";

const Widget12 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);

  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = WIDGET_12_DASHBOARD_3_LEGEND_COLORS;

  useEffect(() => {
    if (additionalState.widget1112Dashboard3Ready) {
      const response = additionalState.widget1112Dashboard3Data.rows
        .filter(
          (row) => row[1] !== "IWp9dQGM0bS" && row[0].includes("TIME") === false
        )
        .map((row) => ({
          ou: row[1],
          value: parseFloat(row[2]).toFixed(1),
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget1112Dashboard3Ready);
  }, [additionalState.widget1112Dashboard3Ready]);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.forEach((row) => {
      if (currentData[row.ou]) {
        currentData[row.ou] += row.value;
      } else {
        currentData[row.ou] = row.value;
      }
    });
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <ThematicMap
        features={hmisGeoJson.features.filter(
          (feature) =>
            feature.properties.level === "2" &&
            feature.geometry.type !== "Point"
        )}
        data={data}
        legend={legend}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget12);

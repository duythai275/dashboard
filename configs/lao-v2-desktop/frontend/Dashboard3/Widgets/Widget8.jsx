import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

import { WIDGET_10_DASHBOARD_3_LEGEND_COLORS } from "../common/constant/color";

const Widget10 = ({ setLoading, dataItemId }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);

  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = WIDGET_10_DASHBOARD_3_LEGEND_COLORS;

  useEffect(() => {
    if (additionalState.widget910Dashboard3Ready) {
      let year = new Date().getFullYear();
      const response = additionalState.widget910Dashboard3Data.rows
        .filter(
          (row) =>
            row[1] === `${year}` &&
            row[0] === dataItemId &&
            row
        )
        .map((row) => ({
          ou: row[2],
          value: parseInt(row[3]),
          pe: row[1],
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget910Dashboard3Ready);
  }, [additionalState.widget910Dashboard3Ready]);

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
export default withWidgetChildrenLoader(Widget10);

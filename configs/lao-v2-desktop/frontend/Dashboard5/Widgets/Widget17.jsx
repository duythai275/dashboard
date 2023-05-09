import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";
import { pull } from "../../utils";
import { WIDGET_17_DASHBOARD_5_COLORS } from "../common/constant/color";

const Widget17 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = WIDGET_17_DASHBOARD_5_COLORS;

  useEffect(() => {
    if (additionalState.widgetDashboard5Widget17Ready) {
      const response = additionalState.widgetDashboard5DataWidget17.rows.map(
        (row) => ({
          ou: row[1],
          value: parseFloat(row[2]).toFixed(1),
        })
      );
      setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5Widget17Ready);
  }, [additionalState.widgetDashboard5Widget17Ready]);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.forEach((row) => {
      currentData[row.ou] = row.value * 1;
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
export default withWidgetChildrenLoader(Widget17);

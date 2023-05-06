import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import useDashboardStore from "@/state/dashboard";

import { WIDGET_6_DASHBOARD_1_LEGEND_COLORS } from "../common/constant/color";

const Widget7 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const additionalState = useDashboardStore((state) => state.additionalState);

  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = WIDGET_6_DASHBOARD_1_LEGEND_COLORS;

  const listTargetPe = useMemo(() => {
    const listPe = [];
    let year = new Date().getFullYear();
    for (let i = 1; i <= 12; i++) {
      listPe.push(`${year}${i > 9 ? i : `0${i}`}`);
    }
    return listPe;
  }, []);

  useEffect(() => {
    if (additionalState.widget1457Dashboard2Ready) {
      const response = additionalState.widget1457Dashboard2Data.rows
        .filter((row) => listTargetPe.includes(row[1]) && row)
        .map((row) => ({
          ou: row[2],
          value: parseInt(row[3]),
          pe: row[1],
        }));
      setResult(response);
    }
    setLoading(!additionalState.widget1457Dashboard2Ready);
  }, [additionalState.widget1457Dashboard2Ready]);

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
export default withWidgetChildrenLoader(Widget7);

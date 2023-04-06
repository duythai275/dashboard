import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";

import { pull } from "../../utils";

const Widget5 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legendSets = useMemo(() => {
    if (!result) return [];
    return result.legends.map((legend) => ({
      color: legend.color,
      max: legend.endValue,
      min: legend.startValue,
    }));
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard1Widget10Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.data.forEach((row) => {
      currentData[row.ou] = row.value;
    });
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <ThematicMap
        features={hmisGeoJson.features.filter(
          (feature) =>
            feature.properties.level === "3" &&
            feature.geometry.type !== "Point"
        )}
        data={data}
        legend={legendSets.map((legend) => legend.color)}
        legendSets={legendSets}
      />
    )
  );
};
export default withWidgetChildrenLoader(Widget5);

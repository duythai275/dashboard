import { useEffect, useState } from "react";
import ThematicMap from "@/components/Widgets/ThematicMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import { pull } from "../../utils";
import { shallow } from "zustand/shallow";

const Widget5 = ({ setLoading }) => {
  const { hmisGeoJson } = useMetadataStore(
    (state) => ({ hmisGeoJson: state.hmisGeoJson }),
    shallow
  );
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const { i18n, t } = useTranslation();
  const legend = ["#fde0dd", "#fa9fb5", "#c51b8a"];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await pull("/api/getDashboard1Widget5Data");
      setResult(result.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.forEach((row) => {
      currentData[row.ou] = row.value;
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
export default withWidgetChildrenLoader(Widget5);

import { useEffect, useState } from "react";
import ThematicTimelineMap from "@/components/Widgets/ThematicTimelineMap";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import useMetadataStore from "@/state/metadata";
import axios from "axios";

const Widget1 = ({ setLoading, apiUrl }) => {
  console.log(apiUrl);
  const [data, setData] = useState(null);
  const orgUnitGeoJson = useMetadataStore((state) => state.orgUnitGeoJson);
  const features = orgUnitGeoJson.features.filter((feature) => feature.properties.level === "3");

  useEffect(() => {
    setLoading(true);
    (async () => {
      const result = await axios.get(apiUrl);
      setData(result.data);
      setLoading(false);
    })();
  }, []);

  return (
    data && (
      <ThematicTimelineMap
        features={features}
        data={data}
        timeline={data && Object.keys(data).sort()}
        legend={["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"]}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget1);

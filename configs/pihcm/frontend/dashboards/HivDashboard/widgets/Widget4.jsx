import ThematicMap from "@/components/Widgets/ThematicMap";
import useMetadataStore from "@/state/metadata";
import { shallow } from "zustand/shallow";

const Widget4 = () => {
  const { orgUnitGeoJson } = useMetadataStore(
    (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
    shallow
  );
  const features = orgUnitGeoJson
    ? orgUnitGeoJson.features.filter(
        (feature) => feature.properties.level === "2"
      )
    : [];

  const data = features.reduce((result, feature, idx) => {
    result[feature.id] = (Math.random() * 4000).toFixed() * 1;
    return result;
  }, {});

  return (
    <ThematicMap
      data={data}
      features={features}
      legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
      legendSet={[
        { color: "#689F38", max: 0, min: 0 },
        { color: "#AFB42B", max: 33, min: 1 },
        { color: "#FBC02D", max: 66, min: 34 },
        { color: "#F57C00", max: 99, min: 67 },
        { color: "#AC0800", max: 100, min: 100 },
      ]}
    />
  );
};

export default Widget4;

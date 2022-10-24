import ThematicMap from "@/components/Widgets/ThematicMap";
import useMetadataStore from "@/state/metadata";

const Widget1_3 = () => {
  const orgUnitGeoJson = useMetadataStore((state) => state.orgUnitGeoJson);
  const features = orgUnitGeoJson.features.filter((feature) => feature.properties.level === "3");

  return (
    <ThematicMap
      features={features}
      data={{ aNFYpBa4WHm: 50, nycwQzwWMkn: 1000, XNcCColNA3b: 3000 }}
      legend={[
        { max: 100, color: "green" },
        { min: 101, max: 2000, color: "blue" },
        { min: 2001, color: "red" }
      ]}
    />
  );
};

export default Widget1_3;

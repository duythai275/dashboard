import ThematicTimelineMap from "@/components/Widgets/ThematicTimelineMap";
import useMetadataStore from "@/state/metadata";

const Widget1_4 = () => {
  const orgUnitGeoJson = useMetadataStore((state) => state.orgUnitGeoJson);
  const features = orgUnitGeoJson.features.filter((feature) => feature.properties.level === "3");

  return (
    <ThematicTimelineMap
      features={features}
      timeline={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
      data={{
        Jan: { aNFYpBa4WHm: 50, nycwQzwWMkn: 1000, XNcCColNA3b: 3000 },
        Feb: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Mar: { aNFYpBa4WHm: 3000, nycwQzwWMkn: 50, XNcCColNA3b: 1000 },
        Apr: { aNFYpBa4WHm: 50, nycwQzwWMkn: 1000, XNcCColNA3b: 3000 },
        May: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Jun: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Jul: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Aug: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Sep: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Oct: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Nov: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 },
        Dec: { aNFYpBa4WHm: 1000, nycwQzwWMkn: 3000, XNcCColNA3b: 50 }
      }}
      legend={[
        { max: 100, color: "green" },
        { min: 101, max: 2000, color: "blue" },
        { min: 2001, color: "red" }
      ]}
    />
  );
};

export default Widget1_4;

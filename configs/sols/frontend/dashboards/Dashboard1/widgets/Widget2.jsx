import { useEffect } from "react";
import ThematicMap from "@/components/Widgets/ThematicMap";

import useMetadataStore from "@/state/metadata";

const Widget2 = () => {
    // const { orgUnitGeoJson } = useMetadataStore(
    //     (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
    //     shallow
    // );

    // return <ThematicMap
    //     features={
    //         orgUnitGeoJson.features.filter( (feature) =>
    //             feature.properties.level === "2" &&
    //             feature.geometry.type !== "Point"
    //         )
    //     }
    //     data={{
    //         cn6teczxZRw: 412,
    //         vvYpow29rvb: 234,
    //         VqwZfRiQ0T0: 645,
    //         gJF6YrXKBWc: 234,
    //         oZLUXxxNNZf: 564,
    //         gr5kgUy7gIx: 678,
    //         XF87NOJt2ae: 434,
    //         q2lVxucI0Ru: 675,
    //         LSs6W646sKx: 314,
    //         v8eXAbhzdWe: 343
    //     }}
    //     legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
    //     legendSet={[
    //         { color: "#689F38", max: 150, min: 0 },
    //         { color: "#AFB42B", max: 300, min: 151 },
    //         { color: "#FBC02D", max: 450, min: 301 },
    //         { color: "#F57C00", max: 600, min: 451 },
    //         { color: "#AC0800", max: 750, min: 601 },
    //       ]}
    // />
    return <div>TEST Map</div>
}

export default Widget2;
import { shallow } from "zustand/shallow";
import L from "leaflet";
import MixedMap from "@/components/Widgets/MixedMap";

import useMetadataStore from "@/state/metadata";

const Widget1 = () => {
    const { orgUnitGeoJson } = useMetadataStore(
        (state) => ({ orgUnitGeoJson: state.orgUnitGeoJson }),
        shallow
    );

    return <MixedMap
        features={
            orgUnitGeoJson.features.filter( (feature) =>
                feature.properties.level === "2" &&
                feature.geometry.type !== "Point"
            )
        }
        individualMarkers={[
            {
                coordinates: [-10.3326,161.5222],
                icon: L.divIcon({
                    iconSize: 32,
                    className: "dengue-death-case-marker",
                    html: `<b>1</b>`,
                })
            },
            {
                coordinates: [-9.3326,160.443],
                icon: L.divIcon({
                    iconSize: 32,
                    className: "dengue-death-case-marker",
                    html: `<b>3</b>`,
                })
            }
        ]}
        data={{
            cn6teczxZRw: 12,
            vvYpow29rvb: 34,
            VqwZfRiQ0T0: 45,
            gJF6YrXKBWc: 34,
            oZLUXxxNNZf: 64,
            gr5kgUy7gIx: 78,
            XF87NOJt2ae: 34,
            q2lVxucI0Ru: 75,
            LSs6W646sKx: 14,
            v8eXAbhzdWe: 43
        }}
        legend={["#689F38", "#AFB42B", "#FBC02D", "#F57C00", "#AC0800"]}
    />
}

export default Widget1;
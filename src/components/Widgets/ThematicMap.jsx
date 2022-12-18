import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { getQuantiles, getEqualIntervals } from "./utils";
import { Typography } from "@mui/material";
import { LEAFLET_CONTROL_POSITIONS } from "./const";

const GeoJsonLayer = ({ features, currentData, legend, setLabel }) => {
  const ref = useRef(null);
  const map = useMap();
  const ranges = getEqualIntervals(
    Object.values(currentData).map((value) => value),
    legend.length
  );

  useEffect(() => {
    map.fitBounds(ref.current.getBounds());
  }, []);
  return (
    <GeoJSON
      ref={ref}
      data={{ features }}
      style={{ color: "#4d4d4d" }}
      onEachFeature={(feature, layer) => {
        layer.setStyle({
          weight: 1
        });
        let foundData = currentData[feature.id] || null;
        if (foundData) {
          const foundRangeIndex = ranges.findIndex((range) => foundData <= range.max && foundData >= range.min);
          if (foundRangeIndex !== -1) {
            layer.setStyle({
              fillColor: legend[foundRangeIndex],
              fillOpacity: 0.8
            });
          } else {
            layer.setStyle({
              fillColor: "#4d4d4d",
              fillOpacity: 0.1
            });
          }
        } else {
          layer.setStyle({
            fillColor: "#4d4d4d",
            fillOpacity: 0.1
          });
        }

        layer.on("mouseover", () => {
          setLabel(feature.properties.name + ": " + (foundData ? foundData : "No data"));
          layer.setStyle({
            weight: 3
          });
        });
        layer.on("mouseout", () => {
          setLabel("");
          layer.setStyle({
            weight: 1
          });
        });
      }}
    />
  );
};

const LabelLayer = ({ label }) => {
  return (
    <div className={`${LEAFLET_CONTROL_POSITIONS.topRight} label-layer-container`}>
      <Typography variant="subtitle2">{label ? label : ""}</Typography>
    </div>
  );
};
const ThematicMap = (props) => {
  const [label, setLabel] = useState("");
  return (
    <MapContainer scrollWheelZoom={false}>
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {label && <LabelLayer label={label} />}
      <GeoJsonLayer {...props} setLabel={setLabel} currentData={props.data} key={JSON.stringify(props.data)} />
    </MapContainer>
  );
};

export default ThematicMap;

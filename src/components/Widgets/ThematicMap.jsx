import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { LEAFLET_CONTROL_POSITIONS } from "./const";
const GeoJsonLayer = ({ features, data, legend, setLabel }) => {
  const ref = useRef(null);
  const map = useMap();
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
        let foundData = data[feature.id];
        if (foundData) {
          const foundLegend = legend.find((legend) => {
            const { max, min } = legend;
            if (!legend.max) {
              return foundData >= min;
            } else if (!legend.min) {
              return foundData <= max;
            } else {
              return foundData <= max && foundData >= min;
            }
          });
          if (foundLegend) {
            layer.setStyle({
              fillColor: foundLegend.color,
              fillOpacity: 0.6
            });
          } else {
            layer.setStyle({
              fillColor: "#4d4d4d",
              fillOpacity: 0.6
            });
          }
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
      {label && <LabelLayer label={label} />}
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      <GeoJsonLayer {...props} setLabel={setLabel} />
    </MapContainer>
  );
};
export default ThematicMap;

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useMap } from "react-leaflet/hooks";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { LEAFLET_CONTROL_POSITIONS } from "./const";
import { useTranslation } from "react-i18next";
import { getEqualIntervals } from "./utils";

const GeoJsonLayer = ({
  features,
  currentData,
  legend,
  setLabel,
  labelPostfix,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const map = useMap();

  const ranges = getEqualIntervals(
    Object.values(currentData).map((value) => value),
    legend.length
  );

  useEffect(() => {
    setTimeout(() => {
      map.fitBounds(ref.current.getBounds());
    }, 500);
  }, []);

  return (
    <GeoJSON
      ref={ref}
      data={{ features }}
      style={{ color: "#4d4d4d" }}
      onEachFeature={(feature, layer) => {
        layer.setStyle({
          weight: 1,
        });
        let foundData = currentData[feature.id] ?? null;
        if (foundData !== null) {
          const foundRangeIndex = ranges.findIndex(
            (range) => foundData <= range.max && foundData >= range.min
          );
          if (foundRangeIndex !== -1) {
            layer.setStyle({
              fillColor: legend[foundRangeIndex],
              fillOpacity: 0.8,
            });
          } else {
            layer.setStyle({
              fillColor: "#4d4d4d",
              fillOpacity: 0.1,
            });
          }
        } else {
          layer.setStyle({
            fillColor: "#4d4d4d",
            fillOpacity: 0.1,
          });
        }
        const postfix = labelPostfix ? labelPostfix : "";
        layer.on("mouseover", () => {
          setLabel(
            feature.properties.name +
              ": " +
              (foundData !== null ? foundData + postfix : t("noData"))
          );
          layer.setStyle({
            weight: 3,
          });
        });
        layer.on("mouseout", () => {
          setLabel("");
          layer.setStyle({
            weight: 1,
          });
        });
      }}
    />
  );
};

const LabelLayer = ({ label }) => {
  return (
    <div
      className={`${LEAFLET_CONTROL_POSITIONS.topRight} label-layer-container`}
    >
      <Typography variant="subtitle2">{label ? label : ""}</Typography>
    </div>
  );
};

const LegendLayer = ({ data, legend }) => {
  const ranges = getEqualIntervals(
    Object.values(data).map((value) => value),
    legend.length
  );
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div
      className="legend-layer-container"
      ref={ref}
      onMouseOver={() => {
        ref.current.style.width = "170px";
        ref.current.style.height = "200px";
        ref.current.style.overflow = "auto";
        setOpen(true);
      }}
      onMouseOut={() => {
        ref.current.style.width = "34px";
        ref.current.style.height = "34px";
        ref.current.style.overflow = "hidden";
        setOpen(false);
      }}
    >
      {open ? (
        [
          <div className="legend-title">
            <strong>Legend</strong>
          </div>,
          ranges.map((range, index) => {
            return (
              <div className="legend-item">
                <div style={{ backgroundColor: legend[index] }}></div>
                <div>
                  {range.min} - {range.max}
                </div>
              </div>
            );
          }),
        ]
      ) : (
        <FontAwesomeIcon icon={faCircleInfo} />
      )}
    </div>
  );
};

const ClusterLayer = ({ markers, icon }) => {
  return (
    <MarkerClusterGroup chunkedLoading>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} icon={icon}></Marker>
      ))}
    </MarkerClusterGroup>
  );
};

const MixMap = (props) => {
  const [label, setLabel] = useState("");
  return (
    <MapContainer scrollWheelZoom={false} dragging={false}>
      <ClusterLayer {...props} />
      <LegendLayer {...props} />
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {label && <LabelLayer label={label} />}
      <GeoJsonLayer
        {...props}
        setLabel={setLabel}
        currentData={props.data}
        key={JSON.stringify(props.data)}
      />
    </MapContainer>
  );
};

export default MixMap;

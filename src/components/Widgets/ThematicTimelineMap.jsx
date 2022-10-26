import { Typography, IconButton, Tooltip } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { useInterval } from "usehooks-ts";
import { LEAFLET_CONTROL_POSITIONS } from "./const";
import { getQuantiles } from "./utils";
const GeoJsonLayer = ({ features, currentData, legend, setLabel }) => {
  const ref = useRef(null);
  const map = useMap();
  const ranges = getQuantiles(
    Object.values(currentData).map((value) => value),
    5
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

const TimelineLayer = ({ timeline, setTimelineLabel }) => {
  const timelineRef = useRef(null);
  const [timelineItemWidth, setTimelineItemWidth] = useState(10);
  const [play, setPlay] = useState(true);
  const [index, setIndex] = useState(0);

  useInterval(
    () => {
      setTimelineLabel(timeline[index + 1]);
      setIndex(index + 1);
    },
    play ? 2000 : null
  );

  useEffect(() => {
    if (index >= timeline.length - 1) {
      setPlay(false);
      setIndex(timeline.length - 1);
      setTimelineLabel(timeline[timeline.length - 1]);
    }
  }, [index]);

  useEffect(() => {
    if (timelineRef && timelineRef.current) {
      const totalWidth = timelineRef.current.offsetWidth - 16;
      const width = Math.floor(totalWidth / timeline.length);
      setTimelineItemWidth(width);
    }
  }, [timelineRef]);

  return (
    <div className="timeline-layer-container">
      <div>
        {!play && (
          <IconButton
            size="small"
            onClick={() => {
              if (index < timeline.length - 1) {
                setPlay(true);
              }
            }}
          >
            <PlayArrowRoundedIcon fontSize="inherit" color="primary" />
          </IconButton>
        )}
        {play && (
          <IconButton
            size="small"
            onClick={() => {
              setPlay(false);
            }}
          >
            <PauseRoundedIcon fontSize="inherit" color="primary" />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={() => {
            setIndex(0);
            setTimelineLabel(timeline[0]);
            setPlay(true);
          }}
        >
          <RefreshRoundedIcon fontSize="inherit" color="primary" />
        </IconButton>
      </div>

      <div ref={timelineRef}>
        {(() => {
          const elements = [];
          for (let i = 0; i < timeline.length; i++) {
            elements.push(
              <Tooltip title={timeline[i]} placement="top">
                <div
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    setTimelineLabel(timeline[i]);
                    setPlay(false);
                  }}
                  className={`timeline-item-container ${index === i ? "timeline-selected" : ""}`}
                  style={{ width: timelineItemWidth }}
                ></div>
              </Tooltip>
            );
          }
          return elements;
        })()}
      </div>
    </div>
  );
};
const TimelineLabelLayer = ({ timelineLabel }) => {
  return (
    <div className="timeline-label-layer-container">
      <div>
        <Typography variant="subtitle2">{timelineLabel}</Typography>
      </div>
    </div>
  );
};

const ThematicTimelineMap = (props) => {
  const [label, setLabel] = useState("");
  const [timelineLabel, setTimelineLabel] = useState(props.timeline[0]);
  return (
    <MapContainer scrollWheelZoom={false}>
      {timelineLabel && <TimelineLabelLayer timelineLabel={timelineLabel} />}
      <TimelineLayer {...props} setTimelineLabel={setTimelineLabel} />
      {label && <LabelLayer label={label} />}
      <TileLayer
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      <GeoJsonLayer
        {...props}
        setLabel={setLabel}
        currentData={timelineLabel ? props.data[timelineLabel] : {}}
        key={timelineLabel}
      />
    </MapContainer>
  );
};
export default ThematicTimelineMap;

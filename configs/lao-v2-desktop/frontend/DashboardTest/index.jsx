import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import L from "leaflet";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import ClusterMap from "@/components/Widgets/ClusterMap";
import { pull } from "../utils";
import caseMarkerImage from "@/config/assets/marker.png";

const caseMarker = new L.Icon({
  iconUrl: caseMarkerImage,
  iconRetinaUrl: caseMarkerImage,
  iconAnchor: null,
  popupAnchor: [0, -12],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(10, 10)
});

const ReactGridLayout = WidthProvider(Responsive);

const DashboardTest = () => {
  const { t } = useTranslation();
  const hmisGeoJson = useMetadataStore((state) => state.hmisGeoJson);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await pull("/api/testtest");
      console.log(result.data);
      const markers = result.data.rows.map((row) => {
        return [parseFloat(row[5]), parseFloat(row[4])];
      });
      setData([...markers]);
    })();
  }, []);

  console.log(hmisGeoJson);
  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [{ i: "1", x: 0, y: 0, w: 12, h: 60 }]
      }}
      cols={{ desktop: 12, mobile: 6 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={3}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("asdasdasdasdasd"),
            widget: (
              <ClusterMap
                features={hmisGeoJson.features.filter((f) => f.properties.level === "2" && f.geometry.type !== "Point")}
                markers={data}
                icon={caseMarker}
              />
            )
          }
        ]}
      />
    </ReactGridLayout>
  );
};

export default DashboardTest;

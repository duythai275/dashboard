import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import L from "leaflet";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import withWidgetChildrenLoader from "@/hocs/WidgetContainer/withWidgetChildrenLoader";
import { useTranslation } from "react-i18next";
import useMetadataStore from "@/state/metadata";
import ClusterMap from "@/components/Widgets/ClusterMap";
import { pull, findHeaderIndex } from "../../utils";
import useDashboardStore from "@/state/dashboard";
import caseMarkerImage from "@/config/assets/marker.png";

const caseMarker = new L.Icon({
  iconUrl: caseMarkerImage,
  iconRetinaUrl: caseMarkerImage,
  iconAnchor: null,
  popupAnchor: [0, -12],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(10, 10),
});

const ReactGridLayout = WidthProvider(Responsive);

const Widget13 = ({ setLoading, dataItemId, hmisGeoJson }) => {
  const { i18n, t } = useTranslation();
  //const hmisGeoJson = useMetadataStore((state) => state.hmisGeoJson);
  const [data, setData] = useState(null);
  const additionalState = useDashboardStore((state) => state.additionalState);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (additionalState.widgetDashboard5EventReady) {
      //   const response = {
      //     data: [],
      //   };
      let markers = [];
      dataItemId.forEach((da) => {
        if (additionalState.widgetDashboard5EventData[da]) {
          markers = [
            ...markers,
            ...additionalState.widgetDashboard5EventData[da].map((e) => {
              return { ...e, icon: caseMarker };
            }),
          ];
        }
        // response.data = [
        //   ...response.data,
        //   ...additionalState.widgetDashboard5EventData[da],
        // ];
      });
      setData(markers);
      //setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5EventReady);
  }, [additionalState.widgetDashboard5EventReady]);

  //   useEffect(() => {
  //     if (!result) return;

  //     (async () => {
  //       const markers = result.data.map((row) => {
  //         return [parseFloat(row.lat), parseFloat(row.long)];
  //       });
  //       setData([...markers]);
  //     })();
  //   }, [i18n.language, JSON.stringify(result)]);

  return (
    data && (
      <ClusterMap
        features={hmisGeoJson}
        markers={data}
        // icon={caseMarker}
      />
    )
  );
};

export default withWidgetChildrenLoader(Widget13);

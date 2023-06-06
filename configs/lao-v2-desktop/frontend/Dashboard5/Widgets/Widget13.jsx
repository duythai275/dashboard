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
import ThematicMap from "@/components/Widgets/ThematicMap";
import { WIDGET_17_DASHBOARD_5_COLORS } from "../common/constant/color";

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
  const legend = WIDGET_17_DASHBOARD_5_COLORS;

  useEffect(() => {
    if (additionalState.widgetDashboard5EventReady) {
      const response = additionalState.widgetDashboard5EventData.rows.filter(
        (row) => {
          if (
            dataItemId.includes(
              row[
                findHeaderIndex(
                  additionalState.widgetDashboard5EventData.headers,
                  "Dyq13cMGMzT"
                )
              ]
            )
          ) {
            return row;
          }
        }
      );
      setResult(response);
    }
    setLoading(!additionalState.widgetDashboard5EventReady);
  }, [additionalState.widgetDashboard5EventReady]);

  useEffect(() => {
    if (!result) return;
    const currentData = {};
    result.forEach((row) => {
      const ou =
        row[
          findHeaderIndex(
            additionalState.widgetDashboard5EventData.headers,
            "ou"
          )
        ];
      const value = parseFloat(
        row[
          findHeaderIndex(
            additionalState.widgetDashboard5EventData.headers,
            "value"
          )
        ]
      ).toFixed(1);
      if (!currentData[ou]) {
        currentData[ou] = 0;
      }
      currentData[ou] = currentData[ou] + value * 1;
    });
    setData({ ...currentData });
  }, [i18n.language, JSON.stringify(result)]);

  return (
    data && <ThematicMap features={hmisGeoJson} data={data} legend={legend} />
  );
};

export default withWidgetChildrenLoader(Widget13);

import React, { useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useDashboardStore from "@/state/dashboard";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { pull } from "../utils";
const ReactGridLayout = WidthProvider(Responsive);

import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";
import Widget4 from "./Widgets/Widget4";
import Widget5 from "./Widgets/Widget5";
import Widget6 from "./Widgets/Widget6";
import Widget7 from "./Widgets/Widget7";
import Widget8 from "./Widgets/Widget8";
import Widget9 from "./Widgets/Widget9";
import Widget10 from "./Widgets/Widget10";
import Widget11 from "./Widgets/Widget11";
import Widget12 from "./Widgets/Widget12";
import Widget13 from "./Widgets/Widget13";
import Widget14 from "./Widgets/Widget14";
import Widget15 from "./Widgets/Widget15";
import Widget16 from "./Widgets/Widget16";
import Widget17 from "./Widgets/Widget17";

import {
  WIDGET_1_DASHBOARD_5_DATA_ITEM,
  WIDGET_2_DASHBOARD_5_DATA_ITEM,
  WIDGET_3_DASHBOARD_5_DATA_ITEM,
  WIDGET_4_DASHBOARD_5_DATA_ITEM,
  WIDGET_5_DASHBOARD_5_DATA_ITEM,
  WIDGET_6_DASHBOARD_5_DATA_ITEM,
  WIDGET_7_DASHBOARD_5_DATA_ITEM,
  WIDGET_8_DASHBOARD_5_DATA_ITEM,
  WIDGET_9_DASHBOARD_5_DATA_ITEM,
  WIDGET_10_DASHBOARD_5_DATA_ITEM,
  WIDGET_11_DASHBOARD_5_DATA_ITEM,
  WIDGET_12_DASHBOARD_5_DATA_ITEM,
  WIDGET_13_DASHBOARD_5_DATA_ITEM,
  WIDGET_14_DASHBOARD_5_DATA_ITEM,
  WIDGET_15_DASHBOARD_5_DATA_ITEM,
  WIDGET_16_DASHBOARD_5_DATA_ITEM,
  WIDGET_17_DASHBOARD_5_DATA_ITEM,
} from "./common/constant/dataItem";

const Dashboard5 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore(
    (state) => state.changeAdditionalStateProperty
  );

  let hmisGeoJson = useMetadataStore((state) => state.hmisGeoJson);
  hmisGeoJson = hmisGeoJson.features.filter(
    (f) => f.properties.level === "2" && f.geometry.type !== "Point"
  );

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widgetDashboard5Ready", false);
      changeAdditionalStateProperty("widgetDashboard5Widget16Ready", false);
      changeAdditionalStateProperty("widgetDashboard5Widget17Ready", false);
      changeAdditionalStateProperty("widgetDashboard5EventReady", false);
      const result = await pull("/api/getDashboard5Data");
      const result16 = await pull("/api/getDashboard5DataWidget16");
      const result17 = await pull("/api/getDashboard5DataWidget17");
      const resultEvents = await pull("/api/getDashboard5EventData");
      console.log(resultEvents);
      changeAdditionalStateProperty("widgetDashboard5Ready", true);
      changeAdditionalStateProperty("widgetDashboard5Widget16Ready", true);
      changeAdditionalStateProperty("widgetDashboard5Widget17Ready", true);
      changeAdditionalStateProperty("widgetDashboard5EventReady", true);
      changeAdditionalStateProperty("widgetDashboard5Data", result.data);
      changeAdditionalStateProperty(
        "widgetDashboard5DataWidget16",
        result16.data
      );
      changeAdditionalStateProperty(
        "widgetDashboard5DataWidget17",
        result17.data
      );
      changeAdditionalStateProperty(
        "widgetDashboard5EventData",
        resultEvents.data
      );
    })();
  }, []);

  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 2, h: 22 },
          { i: "2", x: 2, y: 0, w: 2, h: 22 },
          { i: "3", x: 4, y: 0, w: 2, h: 22 },
          { i: "4", x: 6, y: 0, w: 2, h: 22 },
          { i: "5", x: 8, y: 0, w: 2, h: 22 },
          { i: "6", x: 0, y: 20, w: 5, h: 40 },
          { i: "7", x: 5, y: 20, w: 5, h: 40 },
          { i: "8", x: 0, y: 60, w: 5, h: 40 },
          { i: "9", x: 5, y: 60, w: 5, h: 40 },
          { i: "10", x: 0, y: 100, w: 5, h: 40 },
          { i: "11", x: 5, y: 100, w: 5, h: 40 },
          { i: "12", x: 0, y: 140, w: 5, h: 40 },
          { i: "13", x: 5, y: 140, w: 5, h: 40 },
          { i: "14", x: 0, y: 180, w: 5, h: 40 },
          { i: "15", x: 5, y: 180, w: 5, h: 40 },
          { i: "16", x: 0, y: 220, w: 5, h: 40 },
          { i: "17", x: 5, y: 220, w: 5, h: 40 },
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 10, h: 22 },
          { i: "2", x: 0, y: 20, w: 10, h: 22 },
          { i: "3", x: 0, y: 40, w: 10, h: 22 },
          { i: "4", x: 0, y: 60, w: 10, h: 22 },
          { i: "5", x: 0, y: 80, w: 10, h: 22 },
          { i: "6", x: 0, y: 120, w: 10, h: 40 },
          { i: "7", x: 0, y: 160, w: 10, h: 40 },
          { i: "8", x: 0, y: 200, w: 10, h: 40 },
          { i: "9", x: 0, y: 240, w: 10, h: 40 },
          { i: "10", x: 0, y: 280, w: 10, h: 40 },
          { i: "11", x: 0, y: 320, w: 10, h: 40 },
          { i: "12", x: 0, y: 360, w: 10, h: 40 },
          { i: "13", x: 0, y: 400, w: 10, h: 40 },
          { i: "14", x: 0, y: 440, w: 10, h: 40 },
          { i: "15", x: 0, y: 480, w: 10, h: 40 },
          { i: "16", x: 0, y: 520, w: 10, h: 40 },
          { i: "17", x: 0, y: 560, w: 10, h: 40 },
        ],
      }}
      cols={{ desktop: 10, mobile: 5 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={3}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("dashboard5_widget1.1Title"),
            widget: <Widget1 dataItemId={WIDGET_1_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={3}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("dashboard5_widget2.1Title"),
            widget: <Widget2 dataItemId={WIDGET_2_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={3}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("dashboard5_widget3.1Title"),
            widget: <Widget3 dataItemId={WIDGET_3_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={3}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("dashboard5_widget4.1Title"),
            widget: <Widget4 dataItemId={WIDGET_4_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={3}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("dashboard5_widget5.1Title"),
            widget: <Widget5 dataItemId={WIDGET_5_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={3}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("dashboard5_widget6.1Title"),
            widget: <Widget6 dataItemId={WIDGET_6_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={3}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("dashboard5_widget7.1Title"),
            widget: (
              <Widget7
                dataItemId={WIDGET_7_DASHBOARD_5_DATA_ITEM}
                hmisGeoJson={hmisGeoJson}
              />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={3}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("dashboard5_widget8.1Title"),
            widget: <Widget8 dataItemId={WIDGET_8_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={3}
        widgetIndex={8}
        childrenWidgets={[
          {
            title: t("dashboard5_widget9.1Title"),
            widget: (
              <Widget9
                dataItemId={WIDGET_9_DASHBOARD_5_DATA_ITEM}
                hmisGeoJson={hmisGeoJson}
              />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={3}
        widgetIndex={9}
        childrenWidgets={[
          {
            title: t("dashboard5_widget10.1Title"),
            widget: <Widget10 dataItemId={WIDGET_10_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={3}
        widgetIndex={10}
        childrenWidgets={[
          {
            title: t("dashboard5_widget11.1Title"),
            widget: (
              <Widget11
                dataItemId={WIDGET_11_DASHBOARD_5_DATA_ITEM}
                hmisGeoJson={hmisGeoJson}
              />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="12"
        dashboardIndex={3}
        widgetIndex={11}
        childrenWidgets={[
          {
            title: t("dashboard5_widget12.1Title"),
            widget: <Widget12 dataItemId={WIDGET_12_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="13"
        dashboardIndex={3}
        widgetIndex={12}
        childrenWidgets={[
          {
            title: t("dashboard5_widget13.1Title"),
            widget: (
              <Widget13
                dataItemId={WIDGET_13_DASHBOARD_5_DATA_ITEM}
                hmisGeoJson={hmisGeoJson}
              />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="14"
        dashboardIndex={3}
        widgetIndex={13}
        childrenWidgets={[
          {
            title: t("dashboard5_widget14.1Title"),
            widget: <Widget14 dataItemId={WIDGET_14_DASHBOARD_5_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="15"
        dashboardIndex={3}
        widgetIndex={14}
        childrenWidgets={[
          {
            title: t("dashboard5_widget15.1Title"),
            widget: (
              <Widget15
                dataItemId={WIDGET_15_DASHBOARD_5_DATA_ITEM}
                hmisGeoJson={hmisGeoJson}
              />
            ),
          },
        ]}
      />
      <WidgetContainer
        key="16"
        dashboardIndex={3}
        widgetIndex={15}
        childrenWidgets={[
          {
            title: t("dashboard5_widget16.1Title"),
            widget: <Widget16 />,
          },
        ]}
      />
      <WidgetContainer
        key="17"
        dashboardIndex={3}
        widgetIndex={16}
        childrenWidgets={[
          {
            title: t("dashboard5_widget17.1Title"),
            widget: <Widget17 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard5;

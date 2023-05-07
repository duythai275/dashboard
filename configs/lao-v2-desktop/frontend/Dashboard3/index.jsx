import React, { useEffect } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useDashboardStore from "@/state/dashboard";
import { pull } from "../utils";
import { useTranslation } from "react-i18next";
const ReactGridLayout = WidthProvider(Responsive);
import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";
import Widget4 from "./Widgets/Widget4";
import Widget5 from "./Widgets/Widget5";
import Widget6 from "./Widgets/Widget6";
import Widget9 from "./Widgets/Widget9";
import Widget8 from "./Widgets/Widget8";
import Widget11 from "./Widgets/Widget11";
import Widget12 from "./Widgets/Widget12";
import {
  WIDGET_1_DASHBOARD_3_DATA_ITEM,
  WIDGET_2_DASHBOARD_3_DATA_ITEM,
  WIDGET_3_DASHBOARD_3_DATA_ITEM,
  WIDGET_4_DASHBOARD_3_DATA_ITEM,
  WIDGET_5_DASHBOARD_3_DATA_ITEM,
  WIDGET_6_DASHBOARD_3_DATA_ITEM,
  WIDGET_9_DASHBOARD_3_DATA_ITEM,
  WIDGET_10_DASHBOARD_3_DATA_ITEM,
} from "./common/constant/dataItem";

const Dashboard3 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore(
    (state) => state.changeAdditionalStateProperty
  );

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widget1Dashboard3Ready", false);
      changeAdditionalStateProperty("widget2Dashboard3Ready", false);
      changeAdditionalStateProperty("widget910Dashboard3Ready", false);
      changeAdditionalStateProperty("widget1112Dashboard3Ready", false);
      const result1 = await pull("/api/getDashboard3Widget1Data");
      const result2 = await pull("/api/getDashboard3Widget2Data");
      const result910 = await pull("/api/getDashboard3Widget910Data");
      const result1112 = await pull("/api/getDashboard3Widget1112Data");
      changeAdditionalStateProperty("widget1Dashboard3Ready", true);
      changeAdditionalStateProperty("widget2Dashboard3Ready", true);
      changeAdditionalStateProperty("widget910Dashboard3Ready", true);
      changeAdditionalStateProperty("widget1112Dashboard3Ready", true);
      changeAdditionalStateProperty("widget1Dashboard3Data", result1.data);
      changeAdditionalStateProperty("widget2Dashboard3Data", result2.data);
      changeAdditionalStateProperty("widget910Dashboard3Data", result910.data);
      changeAdditionalStateProperty(
        "widget1112Dashboard3Data",
        result1112.data
      );
    })();
  }, []);
  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          // { i: "title", x: 0, y: 0, w: 11.9, h: 9 },
          { i: "1", x: 0, y: 0, w: 3, h: 25 },
          { i: "2", x: 3, y: 0, w: 3, h: 25 },
          { i: "3", x: 6, y: 0, w: 3, h: 25 },
          { i: "4", x: 9, y: 0, w: 3, h: 25 },
          { i: "5", x: 0, y: 25, w: 6, h: 50 },
          { i: "6", x: 6, y: 25, w: 6, h: 50 },
          { i: "7", x: 0, y: 75, w: 6, h: 50 },
          { i: "8", x: 6, y: 75, w: 6, h: 50 },
          { i: "9", x: 0, y: 125, w: 6, h: 50 },
          { i: "10", x: 6, y: 125, w: 6, h: 50 },
          { i: "11", x: 0, y: 175, w: 6, h: 50 },
          { i: "12", x: 6, y: 175, w: 6, h: 50 },
          // { i: "7", x: 4, y: 80, w: 4, h: 50 },
          // { i: "8", x: 8, y: 80, w: 4, h: 50 },
          // { i: "9", x: 0, y: 130, w: 8, h: 50 },
          // { i: "10", x: 8, y: 130, w: 4, h: 50 },
          // { i: "11", x: 0, y: 180, w: 6, h: 50 },
          // { i: "12", x: 6, y: 180, w: 6, h: 50 },
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 25 },
          { i: "2", x: 0, y: 25, w: 12, h: 25 },
          { i: "3", x: 0, y: 50, w: 12, h: 25 },
          { i: "4", x: 0, y: 75, w: 12, h: 50 },
          { i: "5", x: 0, y: 125, w: 12, h: 50 },
          { i: "6", x: 0, y: 175, w: 12, h: 50 },
          { i: "7", x: 0, y: 225, w: 12, h: 50 },
          { i: "8", x: 0, y: 275, w: 12, h: 50 },
          { i: "9", x: 0, y: 275, w: 12, h: 50 },
          { i: "10", x: 0, y: 275, w: 12, h: 50 },
          { i: "11", x: 0, y: 275, w: 12, h: 50 },
          { i: "12", x: 0, y: 275, w: 12, h: 50 },
          // { i: "13", x: 0, y: 275, w: 12, h: 50 },
        ],
      }}
      cols={{ desktop: 12, mobile: 6 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      {/* <WidgetContainer
        key="title"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("remarks"), widget: <Title /> }]}
      /> */}
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("dashboard3_widget1.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget1 dataItemId={WIDGET_1_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("dashboard3_widget2.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget2 dataItemId={WIDGET_2_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("dashboard3_widget3.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget3 dataItemId={WIDGET_3_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("dashboard3_widget4.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget4 dataItemId={WIDGET_4_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("dashboard3_widget5.1Title"),
            widget: <Widget5 dataItemId={WIDGET_5_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={0}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("dashboard3_widget6.1Title"),
            widget: <Widget6 dataItemId={WIDGET_6_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={0}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("dashboard3_widget7.1Title"),
            widget: <div>hehe</div>,
          },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={0}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("dashboard3_widget8.1Title"),
            widget: <div>hehe</div>,
          },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={0}
        widgetIndex={8}
        childrenWidgets={[
          {
            title: t("dashboard3_Widget9.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget9 dataItemId={WIDGET_9_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={0}
        widgetIndex={9}
        childrenWidgets={[
          {
            title: t("dashboard3_Widget10.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget8 dataItemId={WIDGET_10_DASHBOARD_3_DATA_ITEM} />,
          },
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={0}
        widgetIndex={10}
        childrenWidgets={[
          {
            title: t("dashboard3_Widget11.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget11 />,
          },
        ]}
      />
      <WidgetContainer
        key="12"
        dashboardIndex={0}
        widgetIndex={11}
        childrenWidgets={[
          {
            title: t("dashboard3_Widget12.1Title", {
              year: new Date().getFullYear(),
            }),
            widget: <Widget12 />,
          },
        ]}
      />
      {/* <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.2Title"), widget: <div>widget2</div> },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.3Title"), widget: <div>widget3</div> },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.4Title"), widget: <div>widget4</div> },
        ]}
      /> */}
      {/* <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.5Title"), widget: <div>widget5</div> },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.6Title"), widget: <div>widget6</div> },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.7Title"), widget: <div>Widget9</div> },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.8Title"), widget: <div>Widget10</div> },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.9Title"), widget: <div>widget9</div> },
        ]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.10Title"), widget: <div>widget10</div> },
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.11Title"), widget: <div>widget11</div> },
        ]}
      />
      <WidgetContainer
        key="12"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.12Title"), widget: <div>widget12</div> },
        ]}
      /> */}
    </ReactGridLayout>
  );
};

export default Dashboard3;

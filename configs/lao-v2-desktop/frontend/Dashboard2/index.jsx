import React, { useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { pull } from "../utils";
import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";
import Widget4_1 from "./Widgets/Widget4_1";
import Widget4_2 from "./Widgets/Widget4_2";
import Widget5_1 from "./Widgets/Widget5_1";
import Widget5_2 from "./Widgets/Widget5_2";
import Widget6 from "./Widgets/Widget6";
import Widget7 from "./Widgets/Widget7";
import Widget8 from "./Widgets/Widget8";

const ReactGridLayout = WidthProvider(Responsive);

const Dashboard2 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore((state) => state.changeAdditionalStateProperty);

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widget14_15_17Dashboard2Ready", false);
      const result = await pull("/api/getDashboard2Widget14_15_17Data");
      changeAdditionalStateProperty("widget14_15_17Dashboard2Ready", true);
      changeAdditionalStateProperty("widget14_15_17Dashboard2Data", result.data);
    })();
  }, []);
  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 4, h: 20 },
          { i: "2", x: 4, y: 0, w: 4, h: 20 },
          { i: "3", x: 8, y: 0, w: 4, h: 20 },
          { i: "4", x: 0, y: 30, w: 6, h: 40 },
          { i: "5", x: 6, y: 30, w: 6, h: 40 },
          { i: "6", x: 0, y: 80, w: 6, h: 40 },
          { i: "7", x: 6, y: 80, w: 6, h: 40 },
          { i: "8", x: 0, y: 130, w: 12, h: 40 }
          // { i: "9", x: 8, y: 130, w: 4, h: 50 },
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 20 },
          { i: "2", x: 0, y: 30, w: 12, h: 20 },
          { i: "3", x: 0, y: 60, w: 12, h: 20 },
          { i: "4", x: 0, y: 90, w: 12, h: 40 },
          { i: "5", x: 0, y: 140, w: 12, h: 40 },
          { i: "6", x: 0, y: 190, w: 12, h: 40 },
          { i: "7", x: 0, y: 240, w: 12, h: 40 },
          { i: "8", x: 0, y: 290, w: 12, h: 40 }
          // { i: "9", x: 0, y: 340, w: 12, h: 50 },
        ]
      }}
      cols={{ desktop: 12, mobile: 6 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={1}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget2.1Title", {
              currentYear: new Date().getFullYear()
            }),
            widget: <Widget1 />
          }
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={1}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2.2Title", {
              currentYear: new Date().getFullYear()
            }),
            widget: <Widget2 />
          }
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={1}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget2.3Title", {
              currentYear: new Date().getFullYear()
            }),
            widget: <Widget3 />
          }
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={1}
        widgetIndex={3}
        childrenWidgets={[
          { title: t("widget2.4.1Title"), widget: <Widget4_1 /> },
          { title: t("widget2.4.2Title"), widget: <Widget4_2 /> }
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={1}
        widgetIndex={4}
        childrenWidgets={[
          { title: t("widget2.5.1Title"), widget: <Widget5_1 /> },
          { title: t("widget2.5.2Title"), widget: <Widget5_2 /> }
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={1}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget2.6Title", {
              currentYear: new Date().getFullYear()
            }),
            widget: <Widget6 />
          }
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={1}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget2.7Title", {
              currentYear: new Date().getFullYear()
            }),
            widget: <Widget7 />
          }
        ]}
      />
      <WidgetContainer key="8" dashboardIndex={1} widgetIndex={7} childrenWidgets={[{ title: t("widget2.8Title"), widget: <Widget8 /> }]} />
      {/* <WidgetContainer
        key="9"
        dashboardIndex={1}
        widgetIndex={8}
        childrenWidgets={[
          { title: t("widget2.9Title"), widget: <div>widget9</div> },
        ]}
      /> */}
    </ReactGridLayout>
  );
};

export default Dashboard2;

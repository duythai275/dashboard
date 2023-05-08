import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
import Widget1 from "./Widgets/Widget1";
import Widget3 from "./Widgets/Widget3";
import Widget4 from "./Widgets/Widget4";
import Widget10 from "./Widgets/Widget10";
import Widget2 from "./Widgets/Widget2";
import Widget5 from "./Widgets/Widget5";
import Widget6 from "./Widgets/Widget6";
import Widget7 from "./Widgets/Widget7";
import Widget8 from "./Widgets/Widget8";
import Widget9 from "./Widgets/Widget9";

const ReactGridLayout = WidthProvider(Responsive);

const Dashboard4 = () => {
  const { t } = useTranslation();

  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 3.5, h: 20 },
          { i: "2", x: 3.5, y: 0, w: 3.5, h: 20 },
          { i: "3", x: 7, y: 0, w: 2.5, h: 20 },
          { i: "4", x: 9.5, y: 0, w: 2.5, h: 20 },
          { i: "5", x: 0, y: 30, w: 7, h: 50 },
          { i: "6", x: 8, y: 30, w: 5, h: 50 },
          { i: "7", x: 0, y: 80, w: 4, h: 50 },
          { i: "8", x: 4, y: 80, w: 4, h: 50 },
          { i: "9", x: 8, y: 80, w: 4, h: 50 },
          { i: "10", x: 0, y: 130, w: 12, h: 40 }
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 20 },
          { i: "2", x: 0, y: 30, w: 12, h: 20 },
          { i: "3", x: 0, y: 60, w: 12, h: 20 },
          { i: "4", x: 0, y: 90, w: 12, h: 20 },
          { i: "5", x: 0, y: 120, w: 12, h: 50 },
          { i: "6", x: 0, y: 170, w: 12, h: 50 },
          { i: "7", x: 0, y: 220, w: 12, h: 50 },
          { i: "8", x: 0, y: 270, w: 12, h: 50 },
          { i: "9", x: 0, y: 320, w: 12, h: 50 },
          { i: "10", x: 0, y: 370, w: 12, h: 40 }
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
            title: t("widget4.1Title"),
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
            title: t("widget4.2Title"),
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
            title: t("widget4.3Title"),
            widget: <Widget3 />
          }
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={1}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4.4Title"),
            widget: <Widget4 />
          }
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={1}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget4.5Title"),
            widget: <Widget5 />
          }
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={1}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget4.6Title"),
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
            title: t("widget4.7Title"),
            widget: <Widget7 />
          }
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={1}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("widget4.8Title"),
            widget: <Widget8 />
          }
        ]}
      />
      <WidgetContainer key="9" dashboardIndex={1} widgetIndex={8} childrenWidgets={[{ title: t("widget4.9Title"), widget: <Widget9 /> }]} />
      <WidgetContainer key="10" dashboardIndex={1} widgetIndex={9} childrenWidgets={[{ title: t("widget4.10Title"), widget: <Widget10 /> }]} />
    </ReactGridLayout>
  );
};

export default Dashboard4;

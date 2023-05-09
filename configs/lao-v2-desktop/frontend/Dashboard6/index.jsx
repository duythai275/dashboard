import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";
import Widget4 from "./Widgets/Widget4";
const ReactGridLayout = WidthProvider(Responsive);

const Dashboard6 = () => {
  const { t } = useTranslation();

  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 12, h: 50 },
          { i: "2", x: 0, y: 50, w: 12, h: 50 },
          { i: "3", x: 0, y: 100, w: 12, h: 50 },
          { i: "4", x: 0, y: 150, w: 12, h: 50 },
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 50 },
          { i: "2", x: 0, y: 50, w: 12, h: 50 },
          { i: "3", x: 0, y: 100, w: 12, h: 50 },
          { i: "4", x: 0, y: 150, w: 12, h: 50 },
        ],
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
            title: t("dashboard6_widget1Title"),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={3}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("dashboard6_widget2Title"),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={3}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("dashboard6_widget3Title"),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={3}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("dashboard6_widget4Title"),
            widget: <Widget4 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard6;

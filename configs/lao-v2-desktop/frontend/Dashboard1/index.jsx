import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Title from "../Title";
import { useTranslation } from "react-i18next";
const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "title", x: 0, y: 0, w: 11.9, h: 9 },
        // { i: "1", x: 0, y: 9, w: 6, h: 50 },
        // { i: "2", x: 0, y: 9, w: 11.9, h: 50 },
        // { i: "3", x: 0, y: 59, w: 6, h: 50 },
        // { i: "4", x: 6, y: 59, w: 5.9, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="title"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("remarks"), widget: <Title /> }]}
      />
      {/* <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]}
      /> */}
      {/* <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={[{ title: t("widget2Title"), widget: <Widget2 /> }]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={[{ title: t("widget3Title"), widget: <Widget3 /> }]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={[{ title: t("widget4Title"), widget: <Widget4 /> }]}
      /> */}
    </ReactGridLayout>
  );
};

export default Dashboard1;

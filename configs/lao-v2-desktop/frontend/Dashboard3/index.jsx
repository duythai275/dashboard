import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Title from "../Title";
import { useTranslation } from "react-i18next";
const ReactGridLayout = WidthProvider(RGL);

const Dashboard3 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        // { i: "title", x: 0, y: 0, w: 11.9, h: 9 },
        { i: "1", x: 0, y: 0, w: 4, h: 30 },
        { i: "2", x: 4, y: 0, w: 4, h: 30 },
        { i: "3", x: 8, y: 0, w: 4, h: 30 },
        { i: "4", x: 0, y: 30, w: 6, h: 50 },
        { i: "5", x: 6, y: 30, w: 6, h: 50 },
        { i: "6", x: 0, y: 80, w: 4, h: 50 },
        { i: "7", x: 4, y: 80, w: 4, h: 50 },
        { i: "8", x: 8, y: 80, w: 4, h: 50 },

        { i: "9", x: 0, y: 130, w: 8, h: 50 },
        { i: "10", x: 8, y: 130, w: 4, h: 50 },
        { i: "11", x: 0, y: 180, w: 6, h: 50 },
        { i: "12", x: 6, y: 180, w: 6, h: 50 },
      ]}
      cols={12}
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
          { title: t("widget3.1Title"), widget: <div>widget1</div> },
        ]}
      />
      <WidgetContainer
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
      />
      <WidgetContainer
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
          { title: t("widget3.7Title"), widget: <div>widget7</div> },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget3.8Title"), widget: <div>widget8</div> },
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
      />
    </ReactGridLayout>
  );
};

export default Dashboard3;

import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Title from "../Title";
import Widget1 from "./Widget1";
import { useTranslation } from "react-i18next";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard2 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "title", x: 0, y: 0, w: 11.9, h: 9 },
        { i: "1", x: 0, y: 9, w: 11.9, h: 70 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="title"
        dashboardIndex={1}
        widgetIndex={0}
        childrenWidgets={[{ title: "Remarks", widget: <Title /> }]}
      />
      <WidgetContainer
        key="1"
        dashboardIndex={1}
        widgetIndex={1}
        childrenWidgets={[
          { title: "Facilities Profile Summary", widget: <Widget1 /> },
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard2;

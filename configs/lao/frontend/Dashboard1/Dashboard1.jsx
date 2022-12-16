import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import CustomWidget from "@/components/Widgets/Custom";
import Widget1 from "./Widget1";
const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[{ i: "1", x: 0, y: 0, w: 12, h: 50 }]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: "TEST WIDGET", widget: <Widget1 /> }]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

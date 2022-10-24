import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Widget1_1 from "./Widget1/Widget1_1";
import Widget1_2 from "./Widget1/Widget1_2";
const ReactGridLayout = WidthProvider(RGL);
const layout = [
  { i: "1", x: 0, y: 0, w: 6, h: 50 },
  { i: "2", x: 6, y: 0, w: 6, h: 50 }
];

const Dashboard1 = () => {
  return (
    <ReactGridLayout isDraggable={false} layout={layout} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title:
              "This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 ",
            widget: Widget1_1
          },
          {
            title: "This is a child name 2",
            widget: Widget1_2
          }
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={[
          {
            title:
              "This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 ",
            widget: Widget1_1
          },
          {
            title: "This is a child name 2",
            widget: Widget1_2
          }
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

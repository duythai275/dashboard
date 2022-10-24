import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Widget1_1 from "./Widget1/Widget1_1";
import Widget1_2 from "./Widget1/Widget1_2";
import Widget1_3 from "./Widget1/Widget1_3";
import Widget1_4 from "./Widget1/Widget1_4";
import Widget1_5 from "./Widget1/Widget1_5";
const ReactGridLayout = WidthProvider(RGL);
const layout = [
  { i: "1", x: 0, y: 0, w: 6, h: 50 },
  { i: "2", x: 6, y: 0, w: 6, h: 50 },
  { i: "3", x: 0, y: 0, w: 6, h: 60 },
  { i: "4", x: 6, y: 0, w: 6, h: 60 },
  { i: "5", x: 0, y: 0, w: 6, h: 60 }
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
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={[
          {
            title:
              "This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 ",
            widget: Widget1_3
          }
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={[
          {
            title:
              "This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 ",
            widget: Widget1_4
          }
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={4}
        childrenWidgets={[
          {
            title:
              "This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 This is a child name 1 ",
            widget: Widget1_5
          }
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

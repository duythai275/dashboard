import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Widget1_1 from "./Widget1/Widget1_1";
import Widget2_1 from "./Widget2/Widget2_1";
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
            title: "Flooding 2022 Acute Diarrhoea map timeline",
            widget: Widget1_1
          }
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: "Daily trend in flood-affected areas: Acute Diarrhea (New Cases)",
            widget: Widget2_1
          }
        ]}
      />
      {/* <WidgetContainer
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
      /> */}
    </ReactGridLayout>
  );
};

export default Dashboard1;

import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
const ReactGridLayout = WidthProvider(RGL);
const layout = [
  { i: "a", x: 0, y: 0, w: 6, h: 10 },
  { i: "b", x: 6, y: 0, w: 6, h: 10 }
];

const Dashboard2 = () => {
  return (
    <ReactGridLayout isDraggable={false} layout={layout} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer key="a" childrens={[]} />
      <WidgetContainer key="b" />
    </ReactGridLayout>
  );
};

export default Dashboard2;

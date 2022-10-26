import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Typography } from "@mui/material";

const ReactGridLayout = WidthProvider(RGL);
const layout = [{ i: "1", x: 0, y: 0, w: 50, h: 50 }];

const Dashboard2 = () => {
  return (
    <ReactGridLayout isDraggable={false} layout={layout} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: "COMING SOON...",
            widget: (
              <div>
                <Typography>COMING SOON...</Typography>
              </div>
            )
          }
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard2;

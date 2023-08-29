import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Widget1 } from "./widgets";

import "./index.css";

const Dashboard2 = () => {
    return (
        <ReactGridLayout
            isDraggable={false}
            layout={[
              { i: "1", x: 0, y: 0, w: 6, h: 50 }
            ]}
            cols={12}
            rowHeight={1}
            containerPadding={[0, 0]}
        >
            <WidgetContainer
                key="1"
                widgetIndex={0}
                dashboardIndex={1}
                childrenWidgets={[
                    { title: "Widget 1", widget: <Widget1 /> },
                ]}
            />
        </ReactGridLayout>
    )
}

export default Dashboard2;
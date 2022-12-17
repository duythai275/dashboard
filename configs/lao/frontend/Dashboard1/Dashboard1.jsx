import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import CustomWidget from "@/components/Widgets/Custom";
import HorizontalBarChart from "@/components/Widgets/BarChart";
import Title from "./Title";
import Widget1 from "./Widget1";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  const { t } = useTranslation();

  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "title", x: 0, y: 0, w: 12, h: 8 },
        { i: "1", x: 0, y: 8, w: 12, h: 50 }
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="title"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: "Remarks", widget: <Title /> }]}
      />
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

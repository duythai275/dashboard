import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Title from "../Title";
import Widget1 from "./Widgets/Widget1";
import { useTranslation } from "react-i18next";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard3 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout isDraggable={false} layout={[{ i: "1", x: 0, y: 9, w: 11.9, h: 90 }]} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer key="1" dashboardIndex={1} widgetIndex={1} childrenWidgets={[{ title: t("dashboard3Widget1Title"), widget: <Widget1 /> }]} />
    </ReactGridLayout>
  );
};

export default Dashboard3;

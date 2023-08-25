import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import { useEffect, useMemo } from "react";
import { getISOWeek } from "date-fns";
import { Box } from "@mui/material";
import useDashboardStore from "@/state/dashboard";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import Widget4 from "./widgets/Widget4";

const VariantSarsCov2Dashboard = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 12, h: 50 },
        { i: "2", x: 0, y: 50, w: 12, h: 50 },
        { i: "3", x: 0, y: 100, w: 12, h: 50 },
        { i: "4", x: 0, y: 150, w: 12, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={5}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1VariantSarsCov2DashboardTitle"),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={5}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2VariantSarsCov2DashboardTitle"),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={5}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget3VariantSarsCov2DashboardTitle"),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={5}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4VariantSarsCov2DashboardTitle"),
            widget: <Widget4 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default VariantSarsCov2Dashboard;

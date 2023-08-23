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

const VariantSarsCov2Dashboard = () => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedOrgUnitInfluenza } = additionalState;
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 12, h: 50 },
        { i: "2", x: 0, y: 50, w: 12, h: 50 },
        { i: "3", x: 0, y: 100, w: 12, h: 50 },
        { i: "4", x: 0, y: 150, w: 12, h: 50 },
        { i: "5", x: 0, y: 200, w: 12, h: 50 },
        { i: "6", x: 0, y: 250, w: 12, h: 50 },
        { i: "7", x: 0, y: 300, w: 12, h: 50 },
        { i: "8", x: 0, y: 350, w: 12, h: 50 },
        { i: "9", x: 0, y: 400, w: 12, h: 50 },
        { i: "10", x: 0, y: 450, w: 12, h: 50 },
        { i: "11", x: 0, y: 500, w: 12, h: 50 },
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
            widget: <div>Widget1</div>,
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
            widget: <div>Widget2</div>,
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
            widget: <div>Widget3</div>,
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
            widget: <div>Widget4</div>,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={5}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget5VariantSarsCov2DashboardTitle"),
            widget: <div>Widget5</div>,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={5}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget6VariantSarsCov2DashboardTitle"),
            widget: <div>Widget6</div>,
          },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={5}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget7VariantSarsCov2DashboardTitle"),
            widget: <div>Widget7</div>,
          },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={5}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("widget8VariantSarsCov2DashboardTitle"),
            widget: <div>Widget8</div>,
          },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={5}
        widgetIndex={8}
        childrenWidgets={[
          {
            title: t("widget9VariantSarsCov2DashboardTitle"),
            widget: <div>Widget9</div>,
          },
        ]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={5}
        widgetIndex={9}
        childrenWidgets={[
          {
            title: t("widget10VariantSarsCov2DashboardTitle"),
            widget: <div>Widget10</div>,
          },
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={5}
        widgetIndex={10}
        childrenWidgets={[
          {
            title: t("widget11VariantSarsCov2DashboardTitle"),
            widget: <div>Widget11</div>,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default VariantSarsCov2Dashboard;

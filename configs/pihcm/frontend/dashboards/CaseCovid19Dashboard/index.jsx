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

const CaseCovid19Dashboard = () => {
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
        { i: "3", x: 0, y: 100, w: 6, h: 50 },
        { i: "4", x: 6, y: 100, w: 6, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      {/* <WidgetContainer
        key="1"
        dashboardIndex={3}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1InfluenzaDashboardTitle", {
              orgUnit: selectedOrgUnitInfluenza?.displayName,
            }),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={3}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2InfluenzaDashboardTitle", {
              orgUnit: selectedOrgUnitInfluenza?.displayName,
            }),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={3}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget3InfluenzaDashboardTitle", {
              orgUnit: selectedOrgUnitInfluenza?.displayName,
            }),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={3}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4InfluenzaDashboardTitle", {
              orgUnit: selectedOrgUnitInfluenza?.displayName,
            }),
            widget: <Widget4 />,
          },
        ]}
      /> */}
    </ReactGridLayout>
  );
};

export default CaseCovid19Dashboard;

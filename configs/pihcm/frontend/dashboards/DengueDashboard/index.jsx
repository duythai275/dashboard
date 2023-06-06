import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import { useEffect, useMemo } from "react";
import { getISOWeek } from "date-fns";
import { Box } from "@mui/material";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import useDashboardStore from "@/state/dashboard";
import { findHeaderIndex } from "../../utils";
import { pull } from "@/utils/fetch";
import Widget4 from "./widgets/Widget4";
import Widget5 from "./widgets/Widget5";
import Widget6 from "./widgets/Widget6";
import Widget7 from "./widgets/Widget7";
import Widget8 from "./widgets/Widget8";
import "./index.css";
const DengueDashboard = () => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedOrgUnit } = additionalState;
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 12, h: 50 },
        { i: "2", x: 0, y: 50, w: 12, h: 50 },
        { i: "3", x: 0, y: 100, w: 6, h: 50 },
        { i: "4", x: 6, y: 100, w: 3, h: 50 },
        { i: "5", x: 9, y: 100, w: 3, h: 50 },
        { i: "6", x: 0, y: 150, w: 12, h: 50 },
        { i: "7", x: 0, y: 200, w: 4, h: 50 },
        { i: "8", x: 4, y: 200, w: 8, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={1}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={1}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={1}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget3DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={1}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget4 />,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={1}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget5DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget5 />,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={1}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget6DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget6 />,
          },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={1}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget7DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget7 />,
          },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={1}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("widget8DengueDashboardTitle", {
              orgUnit: selectedOrgUnit?.displayName,
            }),
            widget: <Widget8 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};
export default DengueDashboard;

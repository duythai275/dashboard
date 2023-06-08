import { useTranslation } from "react-i18next";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Widget1, Widget2, Widget3, Widget4 } from "./widgets";

const HivDashboard = () => {
  const { t } = useTranslation();

  return (
    <ReactGridLayout
      isDraggable={false}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
      layout={[
        { i: "1", x: 0, y: 0, w: 5.95, h: 50 },
        { i: "2", x: 5.95, y: 0, w: 5.95, h: 50 },
        { i: "3", x: 0, y: 50, w: 5.95, h: 50 },
        { i: "4", x: 5.95, y: 50, w: 5.95, h: 50 },
      ]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={2}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget1Title", { month: 12, year: 2021 }),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={2}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget2Title"),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={2}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget3Title", { quad: 4, year: 2021 }),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={2}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("HivDashboardWidget4Title"),
            widget: <Widget4 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default HivDashboard;

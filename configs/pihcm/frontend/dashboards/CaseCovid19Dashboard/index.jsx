import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import useDashboardStore from "@/state/dashboard";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Widget1 from "./widgets/widget1";
import Widget2 from "./widgets/widget2";
import Widget3 from "./widgets/widget3";
import Widget4 from "./widgets/Widget4";

const CaseCovid19Dashboard = () => {
  const { t } = useTranslation();
  const additionalState = useDashboardStore(
    (state) => state.additionalState,
    shallow
  );

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
        dashboardIndex={3}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1CaseCovid19DashboardTitle"),
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
            title: t("widget2CaseCovid19DashboardTitle"),
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
            title: t("widget3CaseCovid19DashboardTitle"),
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
            title: t("widget4CaseCovid19DashboardTitle"),
            widget: <Widget4 />,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default CaseCovid19Dashboard;

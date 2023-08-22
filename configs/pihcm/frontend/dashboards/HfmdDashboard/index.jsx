import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);
import useDashboardStore from "@/state/dashboard";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import Widget6 from "./widgets/Widget6";
import Widget7 from "./widgets/Widget7";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";
import Widget12 from "./widgets/Widget12";

const HfmdDashboard = () => {
  const { t } = useTranslation();
  const { additionalState } = useDashboardStore(
    (state) => ({ additionalState: state.additionalState }),
    shallow
  );
  const { selectedOrgUnitInfluenza } = additionalState;
  // console.log(generatePastelColors("#ff0000", 6));
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 12, h: 50 },
        { i: "2", x: 0, y: 50, w: 12, h: 50 },
        { i: "3", x: 0, y: 100, w: 12, h: 50 },
        { i: "4", x: 0, y: 150, w: 6, h: 50 },
        { i: "5", x: 6, y: 150, w: 6, h: 50 },
        { i: "6", x: 0, y: 200, w: 12, h: 50 },
        { i: "7", x: 0, y: 250, w: 6, h: 50 },
        { i: "8", x: 6, y: 250, w: 6, h: 50 },
        { i: "9", x: 0, y: 300, w: 12, h: 50 },
        { i: "10", x: 0, y: 350, w: 12, h: 50 },
        { i: "11", x: 0, y: 400, w: 12, h: 50 },
        { i: "12", x: 0, y: 450, w: 12, h: 50 },
        { i: "13", x: 0, y: 500, w: 6, h: 50 },
        { i: "14", x: 6, y: 500, w: 6, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={4}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1HfmdDashboardTitle"),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={4}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2HfmdDashboardTitle"),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={4}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget3HfmdDashboardTitle"),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={4}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4HfmdDashboardTitle"),
            widget: <div>widget4</div>,
          },
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={4}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget5HfmdDashboardTitle"),
            widget: <div>widget5</div>,
          },
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={4}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget6HfmdDashboardTitle"),
            widget: <Widget6 />,
          },
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={4}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget7HfmdDashboardTitle", {
              total: additionalState.widget7HfmdDashboardTotal || 0,
            }),
            widget: <Widget7 />,
          },
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={4}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("widget8HfmdDashboardTitle", {
              total: additionalState.widget8HfmdDashboardTotal || 0,
            }),
            widget: <Widget8 />,
          },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={4}
        widgetIndex={8}
        childrenWidgets={[
          {
            title: t("widget9HfmdDashboardTitle"),
            widget: <Widget9 />,
          },
        ]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={4}
        widgetIndex={9}
        childrenWidgets={[
          {
            title: t("widget10HfmdDashboardTitle"),
            widget: <Widget10 />,
          },
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={4}
        widgetIndex={10}
        childrenWidgets={[
          {
            title: t("widget11HfmdDashboardTitle"),
            widget: <Widget11 />,
          },
        ]}
      />
      <WidgetContainer
        key="12"
        dashboardIndex={4}
        widgetIndex={11}
        childrenWidgets={[
          {
            title: t("widget12HfmdDashboardTitle"),
            widget: <Widget12 />,
          },
        ]}
      />
      <WidgetContainer
        key="13"
        dashboardIndex={4}
        widgetIndex={12}
        childrenWidgets={[
          {
            title: t("widget13HfmdDashboardTitle"),
            widget: <div>widget13</div>,
          },
        ]}
      />
      <WidgetContainer
        key="14"
        dashboardIndex={4}
        widgetIndex={13}
        childrenWidgets={[
          {
            title: t("widget14HfmdDashboardTitle"),
            widget: <div>widget14</div>,
          },
        ]}
      />
    </ReactGridLayout>
  );
};

export default HfmdDashboard;

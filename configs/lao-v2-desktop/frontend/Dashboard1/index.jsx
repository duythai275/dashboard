import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import Title from "../Title";
import { useTranslation } from "react-i18next";
import Widget4 from "./Widgets/Widget4";
import Widget5 from "./Widgets/Widget5";
import Widget6 from "./Widgets/Widget6";
import Widget7 from "./Widgets/Widget7";
import Widget9 from "./Widgets/Widget9";
import Widget10 from "./Widgets/Widget10";
import { pull } from "../utils";
import useDashboardStore from "@/state/dashboard";
import Widget1 from "./Widgets/Widget1";
import Widget2 from "./Widgets/Widget2";
import Widget3 from "./Widgets/Widget3";
const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore(
    (state) => state.changeAdditionalStateProperty
  );

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widget1234567Dashboard1Ready", false);
      const result = await pull("/api/getDashboard1Widget1234567Data");
      changeAdditionalStateProperty("widget1234567Dashboard1Ready", true);
      changeAdditionalStateProperty("widget1234567Dashboard1Data", result.data);
    })();
  }, []);
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        // { i: "title", x: 0, y: 0, w: 11.9, h: 9 },
        { i: "1", x: 0, y: 0, w: 4, h: 30 },
        { i: "2", x: 4, y: 0, w: 4, h: 30 },
        { i: "3", x: 8, y: 0, w: 4, h: 30 },
        { i: "4", x: 0, y: 30, w: 8, h: 50 },
        { i: "5", x: 8, y: 30, w: 4, h: 50 },
        { i: "6", x: 0, y: 80, w: 8, h: 50 },
        { i: "7", x: 8, y: 80, w: 4, h: 50 },
        { i: "8", x: 0, y: 130, w: 12, h: 50 },
        { i: "9", x: 0, y: 180, w: 8, h: 50 },
        { i: "10", x: 8, y: 180, w: 4, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      {/* <WidgetContainer
        key="title"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("remarks"), widget: <Title /> }]}
      /> */}
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1.1Title", { year: new Date().getFullYear() }),
            widget: <Widget1 />,
          },
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1.2Title", { year: new Date().getFullYear() }),
            widget: <Widget2 />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1.3Title", { year: new Date().getFullYear() }),
            widget: <Widget3 />,
          },
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1.4Title"), widget: <Widget4 /> }]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1.5Title"), widget: <Widget5 /> }]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1.6Title"), widget: <Widget6 /> }]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1.7Title"), widget: <Widget7 /> }]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget1.8Title"), widget: <div>widget8</div> },
        ]}
      />
      <WidgetContainer
        key="9"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1.9Title"), widget: <Widget9 /> }]}
      />
      <WidgetContainer
        key="10"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          { title: t("widget1.10Title"), widget: <Widget10 /> },
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

import { useEffect } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { useTranslation } from "react-i18next";

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useDashboardStore from "@/state/dashboard";

import Widget123 from "./Widgets/Widget123";
import Widget4 from "./Widgets/Widget4";
import Widget5 from "./Widgets/Widget5";
import Widget6 from "./Widgets/Widget6";
import Widget7 from "./Widgets/Widget7";
import Widget9 from "./Widgets/Widget9";
import Widget10 from "./Widgets/Widget10";

import {
  WIDGET_1_DASHBOARD_1_DATA_ITEM,
  WIDGET_2_DASHBOARD_1_DATA_ITEM,
  WIDGET_3_DASHBOARD_1_DATA_ITEM,
} from "./common/constant/dataItem";

import { pull } from "../utils";

const ReactGridLayout = WidthProvider(Responsive);

const Dashboard1 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore(
    (state) => state.changeAdditionalStateProperty
  );

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widget1234567Dashboard1Ready", false);
      const result = await pull("/api/getDashboard1Widget123Data");
      changeAdditionalStateProperty("widget1234567Dashboard1Ready", true);
      changeAdditionalStateProperty("widget1234567Dashboard1Data", result.data);
    })();
  }, []);
  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 4, h: 25 },
          { i: "2", x: 4, y: 0, w: 4, h: 25 },
          { i: "3", x: 8, y: 0, w: 4, h: 25 },
          { i: "4", x: 0, y: 25, w: 8, h: 50 },
          { i: "5", x: 8, y: 25, w: 4, h: 50 },
          { i: "6", x: 0, y: 75, w: 8, h: 50 },
          { i: "7", x: 8, y: 75, w: 4, h: 50 },
          { i: "8", x: 0, y: 125, w: 12, h: 50 },
          { i: "9", x: 0, y: 175, w: 8, h: 50 },
          { i: "10", x: 8, y: 175, w: 4, h: 50 },
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 25 },
          { i: "2", x: 0, y: 25, w: 12, h: 25 },
          { i: "3", x: 0, y: 50, w: 12, h: 25 },
          { i: "4", x: 0, y: 75, w: 12, h: 50 },
          { i: "5", x: 0, y: 125, w: 12, h: 50 },
          { i: "6", x: 0, y: 175, w: 12, h: 50 },
          { i: "7", x: 0, y: 225, w: 12, h: 50 },
          { i: "8", x: 0, y: 275, w: 12, h: 50 },
          { i: "9", x: 0, y: 325, w: 12, h: 50 },
          { i: "10", x: 0, y: 375, w: 12, h: 50 },
        ],
      }}
      cols={{ desktop: 12, mobile: 6 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1.1Title", { year: new Date().getFullYear() }),
            widget: <Widget123 dataItemId={WIDGET_1_DASHBOARD_1_DATA_ITEM} />,
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
            widget: <Widget123 dataItemId={WIDGET_2_DASHBOARD_1_DATA_ITEM} />,
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
            widget: <Widget123 dataItemId={WIDGET_3_DASHBOARD_1_DATA_ITEM} />,
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

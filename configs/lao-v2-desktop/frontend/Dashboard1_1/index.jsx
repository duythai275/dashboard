import { useEffect } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { useTranslation } from "react-i18next";

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useDashboardStore from "@/state/dashboard";

import Widget123 from "./Widgets/Widget123";
import Widget456 from "./Widgets/Widget456";
import Widget7 from "./Widgets/Widget7";
import Widget8 from "./Widgets/Widget8";
import Widget9 from "./Widgets/Widget9";
import Widget10 from "./Widgets/Widget10";
import Widget11 from "./Widgets/Widget11";
import Widget12 from "./Widgets/Widget12";
import Widget13 from "./Widgets/Widget13";

import {
  WIDGET_1_DASHBOARD_1_DATA_ITEM,
  WIDGET_2_DASHBOARD_1_DATA_ITEM,
  WIDGET_3_DASHBOARD_1_DATA_ITEM,
  WIDGET_4_DASHBOARD_1_DATA_ITEM,
  WIDGET_5_DASHBOARD_1_DATA_ITEM,
  WIDGET_6_DASHBOARD_1_DATA_ITEM,
  WIDGET_7_DASHBOARD_1_DATA_ITEM_1,
  WIDGET_7_DASHBOARD_1_DATA_ITEM_2,
  WIDGET_7_DASHBOARD_1_DATA_ITEM_3,
  WIDGET_8_DASHBOARD_1_DATA_ITEM_1,
  WIDGET_8_DASHBOARD_1_DATA_ITEM_2,
  WIDGET_8_DASHBOARD_1_DATA_ITEM_3,
  WIDGET_10_DASHBOARD_1_DATA_ITEM_1,
  WIDGET_10_DASHBOARD_1_DATA_ITEM_2,
  WIDGET_10_DASHBOARD_1_DATA_ITEM_3,
  WIDGET_11_DASHBOARD_1_DATA_ITEM_1,
  WIDGET_11_DASHBOARD_1_DATA_ITEM_2,
  WIDGET_11_DASHBOARD_1_DATA_ITEM_3
} from "./common/constant/dataItem";

import { pull } from "../utils";

const ReactGridLayout = WidthProvider(Responsive);

const Dashboard1_1 = () => {
  const { t } = useTranslation();
  const changeAdditionalStateProperty = useDashboardStore((state) => state.changeAdditionalStateProperty);

  useEffect(() => {
    (async () => {
      changeAdditionalStateProperty("widget123Dashboard1Ready", false);
      changeAdditionalStateProperty("widget456Dashboard1Ready", false);
      changeAdditionalStateProperty("widget10Dashboard1Ready", false);
      const result = await pull("/api/getDashboard1Widget123Data");
      const result456 = await pull("/api/getDashboard1Widget456Data");
      const result10 = await pull("/api/getDashboard1Widget10Data");
      changeAdditionalStateProperty("widget123Dashboard1Ready", true);
      changeAdditionalStateProperty("widget456Dashboard1Ready", true);
      changeAdditionalStateProperty("widget10Dashboard1Ready", true);
      changeAdditionalStateProperty("widget12Dashboard1Ready", true);
      changeAdditionalStateProperty("widget123Dashboard1Data", result.data);
      changeAdditionalStateProperty("widget456Dashboard1Data", result456.data);
      changeAdditionalStateProperty("widget10Dashboard1Data", result10.data);
    })();
  }, []);
  return (
    <ReactGridLayout
      isDraggable={false}
      breakpoints={{ desktop: 1200, mobile: 480 }}
      layouts={{
        desktop: [
          { i: "1", x: 0, y: 0, w: 2, h: 22 },
          { i: "2", x: 2, y: 0, w: 2, h: 22 },
          { i: "3", x: 4, y: 0, w: 2, h: 22 },
          { i: "4", x: 6, y: 0, w: 2, h: 22 },
          { i: "5", x: 8, y: 0, w: 2, h: 22 },
          { i: "6", x: 10, y: 0, w: 2, h: 22 },
          { i: "7", x: 0, y: 25, w: 8, h: 40 },
          { i: "11", x: 8, y: 25, w: 4, h: 40 },
          { i: "8", x: 0, y: 65, w: 8, h: 40 },
          { i: "10", x: 8, y: 65, w: 4, h: 40 },
          { i: "9", x: 0, y: 105, w: 4, h: 40 },
          { i: "12", x: 4, y: 105, w: 8, h: 40 },
          // { i: "10", x: 4, y: 75, w: 4, h: 40 },
          // { i: "11", x: 8, y: 75, w: 4, h: 40 },
          // { i: "12", x: 0, y: 125, w: 8, h: 50 },
          // { i: "13", x: 8, y: 175, w: 4, h: 50 }
        ],
        mobile: [
          { i: "1", x: 0, y: 0, w: 12, h: 22 },
          { i: "2", x: 0, y: 25, w: 12, h: 22 },
          { i: "3", x: 0, y: 50, w: 12, h: 22 },
          { i: "4", x: 0, y: 75, w: 12, h: 22 },
          { i: "5", x: 0, y: 125, w: 12, h: 22 },
          { i: "6", x: 0, y: 175, w: 12, h: 22 },
          { i: "7", x: 0, y: 225, w: 12, h: 40 },
          { i: "10", x: 0, y: 275, w: 12, h: 40 },
          { i: "8", x: 0, y: 275, w: 12, h: 40 },
          { i: "11", x: 0, y: 275, w: 12, h: 40 },
          { i: "9", x: 0, y: 275, w: 12, h: 40 },
          { i: "12", x: 0, y: 275, w: 12, h: 40 },
          //{ i: "13", x: 0, y: 275, w: 12, h: 50 }
        ]
      }}
      cols={{ desktop: 12, mobile: 6 }}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={4}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1.1Title", { year: new Date().getFullYear() }),
            widget: <Widget123 dataItemId={WIDGET_1_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={4}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget1.2Title", { year: new Date().getFullYear() }),
            widget: <Widget123 dataItemId={WIDGET_2_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={4}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget1.3Title", { year: new Date().getFullYear() }),
            widget: <Widget123 dataItemId={WIDGET_3_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={4}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget1.4Title", { year: new Date().getFullYear() }),
            widget: <Widget456 dataItemId={WIDGET_4_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={4}
        widgetIndex={4}
        childrenWidgets={[
          {
            title: t("widget1.5Title", { year: new Date().getFullYear() }),
            widget: <Widget456 dataItemId={WIDGET_5_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={4}
        widgetIndex={5}
        childrenWidgets={[
          {
            title: t("widget1.6Title", { year: new Date().getFullYear() }),
            widget: <Widget456 dataItemId={WIDGET_6_DASHBOARD_1_DATA_ITEM} />
          }
        ]}
      />
      <WidgetContainer
        key="7"
        dashboardIndex={4}
        widgetIndex={6}
        childrenWidgets={[
          {
            title: t("widget1.7.1Title"),
            widget: <Widget7 dataItemId={WIDGET_7_DASHBOARD_1_DATA_ITEM_1} key="1.7.1" />
          },
          {
            title: t("widget1.7.2Title"),
            widget: <Widget7 dataItemId={WIDGET_7_DASHBOARD_1_DATA_ITEM_2} key="1.7.2" />
          },
          {
            title: t("widget1.7.3Title"),
            widget: <Widget7 dataItemId={WIDGET_7_DASHBOARD_1_DATA_ITEM_3} key="1.7.3" />
          }
        ]}
      />
      <WidgetContainer
        key="8"
        dashboardIndex={4}
        widgetIndex={7}
        childrenWidgets={[
          {
            title: t("widget1.8.1Title"),
            widget: <Widget8 dataItemId={WIDGET_8_DASHBOARD_1_DATA_ITEM_1} key="1.8.1" />
          },
          {
            title: t("widget1.8.2Title"),
            widget: <Widget8 dataItemId={WIDGET_8_DASHBOARD_1_DATA_ITEM_2} key="1.8.2" />
          },
          {
            title: t("widget1.8.3Title"),
            widget: <Widget8 dataItemId={WIDGET_8_DASHBOARD_1_DATA_ITEM_3} key="1.8.3" />
          }
        ]}
      />
      <WidgetContainer key="9" dashboardIndex={4} widgetIndex={8} childrenWidgets={[{ title: t("widget1.9Title"), widget: <Widget9 /> }]} />
      <WidgetContainer
        key="10"
        dashboardIndex={4}
        widgetIndex={9}
        childrenWidgets={[
          {
            title: t("widget1.10.1Title"),
            widget: <Widget10 dataItemId={WIDGET_10_DASHBOARD_1_DATA_ITEM_1} key="1.10.1" />
          },
          {
            title: t("widget1.10.2Title"),
            widget: <Widget10 dataItemId={WIDGET_10_DASHBOARD_1_DATA_ITEM_2} key="1.10.2" />
          },
          {
            title: t("widget1.10.3Title"),
            widget: <Widget10 dataItemId={WIDGET_10_DASHBOARD_1_DATA_ITEM_3} key="1.10.3" />
          }
        ]}
      />
      <WidgetContainer
        key="11"
        dashboardIndex={4}
        widgetIndex={10}
        childrenWidgets={[
          {
            title: t("widget1.11.1Title"),
            widget: <Widget11 dataItemId={WIDGET_11_DASHBOARD_1_DATA_ITEM_1} key="1.11.1" />
          },
          {
            title: t("widget1.11.2Title"),
            widget: <Widget11 dataItemId={WIDGET_11_DASHBOARD_1_DATA_ITEM_2} key="1.11.2" />
          },
          {
            title: t("widget1.11.3Title"),
            widget: <Widget11 dataItemId={WIDGET_11_DASHBOARD_1_DATA_ITEM_3} key="1.11.3" />
          }
        ]}
      />
      <WidgetContainer key="12" dashboardIndex={4} widgetIndex={11} childrenWidgets={[{ title: t("widget1.12Title"), widget: <Widget12 /> }]} />
      {/* <WidgetContainer key="13" dashboardIndex={4} widgetIndex={12} childrenWidgets={[{ title: t("widget1.13Title"), widget: <Widget13 /> }]} /> */}
    </ReactGridLayout>
  );
};

export default Dashboard1_1;

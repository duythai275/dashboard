import Widget1 from "./Widget1";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { useTranslation } from "react-i18next";
const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 5.95, h: 30 },
        { i: "2", x: 5.95, y: 0, w: 5.95, h: 30 },
        { i: "3", x: 0, y: 30, w: 11.9, h: 30 }
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer key="1" dashboardIndex={0} widgetIndex={0} childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]} />
      <WidgetContainer key="2" dashboardIndex={0} widgetIndex={0} childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]} />
      <WidgetContainer key="3" dashboardIndex={0} widgetIndex={0} childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]} />
    </ReactGridLayout>
  );
};

export default Dashboard1;

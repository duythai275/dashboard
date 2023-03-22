import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import ReactGridLayout from "react-grid-layout";
import { useTranslation } from "react-i18next";
import Widget1 from "./widgets/Widget1";

const DiseaseDashboard = ({ disease }) => {
  const { t } = useTranslation();
  console.log("aasdasd11112321312");
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 5.95, h: 30 },
        { i: "2", x: 5.95, y: 0, w: 5.95, h: 30 },
        { i: "3", x: 0, y: 30, w: 11.9, h: 30 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1Title"),
            widget: <Widget1 code={disease} ou={"S3kaCiYIP4B"} />,
          },
          {
            title: t("widget1Title1"),
            widget: <Widget1 code={disease} ou={"S3kaCiYIP4B"} />,
          },
        ]}
      />
      {/* <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: t("widget1Title"), widget: <Widget1 /> }]}
      /> */}
    </ReactGridLayout>
  );
};
export default DiseaseDashboard;

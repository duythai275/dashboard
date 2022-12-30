import RGL, { WidthProvider } from "react-grid-layout";
import { useTranslation } from "react-i18next";

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";

import Widget1 from "./Widgets/Widget1";

const ReactGridLayout = WidthProvider(RGL);

const Dashboard3 = () => {
  const { t } = useTranslation();
  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[{ i: "1", x: 0, y: 9, w: 11.9, h: 75 }]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={1}
        widgetIndex={1}
        childrenWidgets={[
          { title: t("dashboard3Widget1Title"), widget: <Widget1 /> },
        ]}
      />
    </ReactGridLayout>
  );
};

export default Dashboard3;

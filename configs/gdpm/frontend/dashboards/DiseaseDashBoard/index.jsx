import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import Widget1 from "./widgets/Widget1";
import RGL, { WidthProvider } from "react-grid-layout";
import Widget2 from "./widgets/Widget2";
const ReactGridLayout = WidthProvider(RGL);

const DiseaseDashboard = ({ disease }) => {
  const { t } = useTranslation();
  const { ouGroups } = useMetadataStore(
    (state) => ({
      ouGroups: state.ouGroups,
    }),
    shallow
  );

  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 9, h: 50 },
        { i: "2", x: 9, y: 0, w: 2.9, h: 50 },
        { i: "3", x: 0, y: 50, w: 3, h: 50 },
        { i: "4", x: 3, y: 50, w: 3, h: 50 },
        { i: "5", x: 6, y: 50, w: 3, h: 50 },
        { i: "6", x: 9, y: 50, w: 2.9, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget2 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
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

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useMetadataStore from "@/state/metadata";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import Widget1 from "./widgets/Widget1";
import RGL, { WidthProvider } from "react-grid-layout";
import Widget2 from "./widgets/Widget2";
const ReactGridLayout = WidthProvider(RGL);

import "./index.css";
import { useMemo } from "react";

const DiseaseDashboard = ({ disease, dashboardIndex }) => {
  const { t, i18n } = useTranslation();
  const { ouGroups, diseases } = useMetadataStore(
    (state) => ({
      ouGroups: state.ouGroups,
      diseases: state.diseases,
    }),
    shallow
  );

  const currentDisease = useMemo(
    () => diseases.find((item) => item.code === disease),
    [disease, JSON.stringify(diseases)]
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
        dashboardIndex={dashboardIndex}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("country"),
            widget: <Widget1 code={disease} ou={"S3kaCiYIP4B"} />,
          },
          ...ouGroups[3].organisationUnits.map((province) => {
            return {
              title: province.name,
              widget: <Widget1 code={disease} ou={province.id} />,
            };
          }),
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={dashboardIndex}
        widgetIndex={1}
        childrenWidgets={[
          {
            title:
              i18n.language === "vi"
                ? `Các ca mắc ${currentDisease.translations[0]?.value} trong 10 tuần qua`
                : `${currentDisease.name} cases in last 10 weeks`,
            widget: <Widget2 code={disease} />,
          },
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={dashboardIndex}
        widgetIndex={2}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={dashboardIndex}
        widgetIndex={3}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="5"
        dashboardIndex={dashboardIndex}
        widgetIndex={4}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
      <WidgetContainer
        key="6"
        dashboardIndex={dashboardIndex}
        widgetIndex={5}
        childrenWidgets={ouGroups[3].organisationUnits.map((province) => {
          return {
            title: province.name,
            widget: <Widget1 code={disease} ou={province.id} />,
          };
        })}
      />
    </ReactGridLayout>
  );
};
export default DiseaseDashboard;

import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import ControlWidget from "./ControlWidget";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import { DISEASES } from "./const";

const ReactGridLayout = WidthProvider(RGL);
const layout = [
  { i: "control", x: 0, y: 0, w: 12, h: 14 },
  { i: "1", x: 0, y: 12, w: 6, h: 48 },
  { i: "2", x: 6, y: 12, w: 6, h: 48 },
  { i: "3", x: 0, y: 62, w: 12, h: 48 }
];

const Dashboard1 = () => {
  return (
    <ReactGridLayout isDraggable={false} layout={layout} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer
        key="control"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: "SELECT DISEASE", widget: <ControlWidget /> }]}
      />
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Flooding 2022 ${disease.name} map timeline (last 30 days)`,
            widget: <Widget1 apiUrl={`/api/getDashboard1Widget1_${index + 1}Data`} key={"11" + index} />
          };
        })}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={DISEASES.map((disease, index) => {
          console.log(`/api/getDashboard1Widget2_${index + 1}Data`);
          return {
            title: `Daily trend in flood-affected areas: ${disease.name} (New Cases)`,
            widget: <Widget2 apiUrl={`/api/getDashboard1Widget2_${index + 1}Data`} key={"12" + index} />
          };
        })}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Trend in flood-affected areas: ${disease.name} (New Cases) - last 14 days`,
            widget: <Widget3 apiUrl={`/api/getDashboard1Widget3_${index + 1}Data`} key={"13" + index} />
          };
        })}
      />
    </ReactGridLayout>
  );
};

export default Dashboard1;

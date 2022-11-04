import React, { useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import ControlWidget from "./ControlWidget";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import Widget4 from "./Widget4";
import { DISEASES } from "./const";
import useDashboardStore from "@/state/dashboard";
import shallow from "zustand/shallow";
const { VITE_APP_MODE, VITE_PRODUCTION_BASE } = import.meta.env;
const ReactGridLayout = WidthProvider(RGL);

const Dashboard1 = () => {
  const { layout, additionalState } = useDashboardStore(
    (state) => ({
      layout: state.layout,
      additionalState: state.additionalState
    }),
    shallow
  );

  const generateLayout1 = () => {
    return [
      <WidgetContainer
        key="1"
        dashboardIndex={0}
        widgetIndex={1}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Flooding 2022 ${disease.name} map timeline (last 30 days)`,
            widget: (
              <Widget1
                apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget1_${
                  index + 1
                }Data`}
                key={"11" + index}
              />
            )
          };
        })}
      />,
      <WidgetContainer
        key="2"
        dashboardIndex={0}
        widgetIndex={2}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Daily trend in flood-affected areas: ${disease.name} (last 30 days)`,
            widget: (
              <Widget2
                apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget2_${
                  index + 1
                }Data`}
                key={"12" + index}
              />
            )
          };
        })}
      />,
      <WidgetContainer
        key="3"
        dashboardIndex={0}
        widgetIndex={4}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Trend in flood-affected areas: ${disease.name} - weeks of this year and last year`,
            widget: (
              <Widget4
                apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget4_${
                  index + 1
                }Data`}
                key={"14" + index}
              />
            )
          };
        })}
      />,
      <WidgetContainer
        key="4"
        dashboardIndex={0}
        widgetIndex={3}
        childrenWidgets={DISEASES.map((disease, index) => {
          return {
            title: `Trend in flood-affected areas: ${disease.name} - last 14 days`,
            widget: (
              <Widget3
                apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget3_${
                  index + 1
                }Data`}
                key={"13" + index}
              />
            )
          };
        })}
      />
    ];
  };

  const generateLayout2 = () => {
    return DISEASES.map((disease, index) => {
      return [
        <WidgetContainer
          key={"1" + index}
          dashboardIndex={0}
          widgetIndex={1 + 4 * index}
          childrenWidgets={[
            {
              title: `Flooding 2022 ${disease.name} map timeline (last 30 days)`,
              widget: (
                <Widget1
                  apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget1_${
                    index + 1
                  }Data`}
                  key={"11" + index}
                />
              )
            }
          ]}
        />,
        <WidgetContainer
          key={"2" + index}
          dashboardIndex={0}
          widgetIndex={2 + 4 * index}
          childrenWidgets={[
            {
              title: `Daily trend in flood-affected areas: ${disease.name} (last 30 days)`,
              widget: (
                <Widget2
                  apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget2_${
                    index + 1
                  }Data`}
                  key={"12" + index}
                />
              )
            }
          ]}
        />,
        <WidgetContainer
          key={"3" + index}
          dashboardIndex={0}
          widgetIndex={4 + 4 * index}
          childrenWidgets={[
            {
              title: `Trend in flood-affected areas: ${disease.name} - weeks of this year and last year`,
              widget: (
                <Widget4
                  apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget4_${
                    index + 1
                  }Data`}
                  key={"14" + index}
                />
              )
            }
          ]}
        />,
        <WidgetContainer
          key={"4" + index}
          dashboardIndex={0}
          widgetIndex={3 + 4 * index}
          childrenWidgets={[
            {
              title: `Trend in flood-affected areas: ${disease.name} - last 14 days`,
              widget: (
                <Widget3
                  apiUrl={`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/getDashboard1Widget3_${
                    index + 1
                  }Data`}
                  key={"13" + index}
                />
              )
            }
          ]}
        />
      ];
    });
  };

  return (
    <ReactGridLayout isDraggable={false} layout={layout} cols={12} rowHeight={1} containerPadding={[0, 0]}>
      <WidgetContainer
        key="control"
        dashboardIndex={0}
        widgetIndex={0}
        childrenWidgets={[{ title: "SELECT DISEASE", widget: <ControlWidget /> }]}
      />
      {additionalState.selectedLayout === "layout1" && generateLayout1()}
      {additionalState.selectedLayout === "layout2" && generateLayout2()}
    </ReactGridLayout>
  );
};

export default Dashboard1;

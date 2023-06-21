import create from "zustand";
import produce from "immer";

const useDashboardStore = create((set, get) => ({
  selectedDashboard: null,
  dashboardState: null,
  additionalState: {},
  dashboards: [],
  layout: null,
  setDashboards: (dashboards) => set(() => ({ dashboards: dashboards })),
  selectDashboard: (dashboard) => set(() => ({ selectedDashboard: dashboard })),
  initDashboardState: (dashboardState) => set(() => ({ dashboardState })),
  changeDashboardState: (dashboardIndex, newState) =>
    set(
      produce((state) => {
        state.dashboardState[dashboardIndex] = newState;
      })
    ),
  selectWidgetChild: (dashboardIndex, widgetIndex, childrenIndex) =>
    set(
      produce((state) => {
        state.dashboardState[dashboardIndex].widgets[
          widgetIndex
        ].selectedChildren = childrenIndex;
      })
    ),
  changeAdditionalStateProperty: (property, value) =>
    set(
      produce((state) => {
        state.additionalState[property] = value;
      })
    ),
  resetAdditionalState: (properties) =>
    set(
      produce((state) => {
        properties.forEach((property) => {
          if (state.additionalState[property]) {
            state.additionalState[property] = null;
          }
        });
      })
    ),
  changeLayout: (layout) => set(() => ({ layout })),
}));

export default useDashboardStore;

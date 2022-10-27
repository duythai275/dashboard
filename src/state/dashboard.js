import create from "zustand";
import produce from "immer";

const useDashboardStore = create((set, get) => ({
  selectedDashboard: null,
  dashboardState: null,
  additionalState: {},
  selectDashboard: (dashboard) => set(() => ({ selectedDashboard: dashboard })),
  initDashboardState: (dashboardState) => set(() => ({ dashboardState })),
  selectWidgetChild: (dashboardIndex, widgetIndex, childrenIndex) =>
    set(
      produce((state) => {
        state.dashboardState[dashboardIndex].widgets[widgetIndex].selectedChildren = childrenIndex;
      })
    ),
  changeAdditionalStateProperty: (property, value) =>
    set(
      produce((state) => {
        state.additionalState[property] = value;
      })
    )
}));

export default useDashboardStore;

import create from "zustand";
import produce from "immer";

const useDashboardStore = create((set, get) => ({
  selectedDashboard: null,
  dashboardState: null,
  selectDashboard: (dashboard) => set(() => ({ selectedDashboard: dashboard })),
  initDashboardState: (dashboardState) => set(() => ({ dashboardState })),
  selectWidgetChild: (dashboardIndex, widgetIndex, childrenIndex) =>
    set(
      produce((state) => {
        state.dashboardState[dashboardIndex].widgets[widgetIndex].selectedChildren = childrenIndex;
      })
    )
}));

export default useDashboardStore;

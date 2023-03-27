import { useEffect } from "react";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";

const changeMapWidgetChildren = () => {
  const { dashboardState, selectedDashboard, selectWidgetChild } = useDashboardStore(
    (state) => ({ dashboardState: state.dashboardState, selectedDashboard: state.selectedDashboard, selectWidgetChild: state.selectWidgetChild }),
    shallow
  );
  const selectedDashboardIndex = selectedDashboard ? selectedDashboard.value : 0;
  const widget4 = dashboardState ? dashboardState[selectedDashboardIndex].widgets[4] : {};

  useEffect(() => {
    if (selectedDashboardIndex && selectedDashboardIndex > 0) {
      selectWidgetChild(selectedDashboardIndex, 2, widget4.selectedChildren);
      selectWidgetChild(selectedDashboardIndex, 3, widget4.selectedChildren);
    }
  }, [widget4 ? widget4.selectedChildren : null]);
};

export default changeMapWidgetChildren;

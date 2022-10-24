import useDashboardStore from "@/state/dashboard";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Dashboard1 from "./Dashboard1/Dashboard1";
import Dashboard2 from "./Dashboard2/Dashboard2";

const dashboards = [
  { name: "Dashboard1", dashboard: Dashboard1 },
  { name: "Dashboard2", dashboard: Dashboard2 }
];

const useDashboardInitialization = () => {
  const [ready, setReady] = useState(false);
  const { initDashboardState, selectDashboard } = useDashboardStore(
    (state) => ({ initDashboardState: state.initDashboardState, selectDashboard: state.selectDashboard }),
    shallow
  );

  useEffect(() => {
    initDashboardState([
      {
        widgets: [
          {
            selectedChildren: 0
          },
          {
            selectedChildren: 0
          }
        ]
      },
      {
        widgets: [
          {
            selectedChildren: 0
          }
        ]
      }
    ]);
    selectDashboard({ value: 0, label: dashboards[0].name });
    setReady(true);
  }, []);

  return ready;
};

export { dashboards, useDashboardInitialization };

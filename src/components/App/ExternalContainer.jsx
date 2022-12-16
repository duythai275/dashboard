import ControlBar from "@/components/ControlBar/ControlBar";
import useDashboardStore from "@/state/dashboard";
import { dashboards, useDashboardInitialization } from "@/config/config";

const ExternalContainer = () => {
  const ready = useDashboardInitialization();
  const selectedDashboard = useDashboardStore((state) => state.selectedDashboard);
  let Dashboard = ready ? dashboards[selectedDashboard.value].dashboard : null;

  return ready ? (
    <div className="external-container">
      <ControlBar />
      <div className="external-dashboard-content">
        <Dashboard />
      </div>
    </div>
  ) : null;
};
export default ExternalContainer;

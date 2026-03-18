import ControlBar from "@/components/ControlBar/ControlBar";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import useDashboardStore from "@/state/dashboard";
import { useDashboardInitialization } from "@/config/config";
import { shallow } from "zustand/shallow";

const ExternalContainer = () => {
  const ready = useDashboardInitialization();
  const { selectedDashboard, dashboards } = useDashboardStore(
    (state) => ({ selectedDashboard: state.selectedDashboard, dashboards: state.dashboards }),
    shallow
  );
  let Dashboard = ready ? dashboards[selectedDashboard.value].dashboard : null;

  return ready ? (
    <div className="external-container">
      <ControlBar />
      <div className="external-dashboard-content">
        {
          Dashboard
        }
      </div>
    </div>
  ) : (
    <FullScreenLoader open={!ready} />
  );
};
export default ExternalContainer;

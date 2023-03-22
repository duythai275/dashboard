import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import useDashboardStore from "@/state/dashboard";
import { useDashboardInitialization } from "@/config/config";
import ControlBar from "@/components/ControlBar/ControlBar";
import { HeaderBar } from "@dhis2/ui";
import { Provider } from "@dhis2/app-runtime";

const InternalContainer = () => {
  const dashboards = useDashboardStore((state) => state.dashboards);
  const ready = useDashboardInitialization();
  const selectedDashboard = useDashboardStore((state) => state.selectedDashboard);
  let Dashboard = ready ? dashboards[selectedDashboard.value].dashboard : null;
  return ready ? (
    <Provider
      config={{
        baseUrl: "../../..",
        apiVersion: "",
        appName: "Dashboard"
      }}
    >
      <div className="internal-container">
        <HeaderBar />
        <ControlBar />
        <div className="internal-dashboard-content">{Dashboard}</div>
      </div>
    </Provider>
  ) : (
    <FullScreenLoader open={!ready} />
  );
};
export default InternalContainer;

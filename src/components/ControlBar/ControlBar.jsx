import DashboardSelector from "./DashboardSelector";
import DashboardButtons from "./DashboardButtons";
import "./ControlBar.css";

const ControlBar = () => {
  return (
    <div className="control-bar-container">
      <div>
        <DashboardSelector />
      </div>
      <div>
        <DashboardButtons />
      </div>
    </div>
  );
};

export default ControlBar;

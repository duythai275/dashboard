import DashboardSelector from "./DashboardSelector";
import DashboardButtons from "./DashboardButtons";
import { customControl } from "@/config/config";

import "./ControlBar.css";

const ControlBar = () => {
  return (
    <div className="control-bar-container">
      <div>
        <DashboardSelector />
      </div>
      <div>{customControl}</div>
      <div>
        <DashboardButtons />
      </div>
    </div>
  );
};

export default ControlBar;

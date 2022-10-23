import OrgUnitSelector from "./OrgUnitSelector/OrgUnitSelector";
import "./ControlBar.css";

const ControlBar = () => {
  return (
    <div className="control-bar-container">
      <OrgUnitSelector />
    </div>
  );
};

export default ControlBar;

import { Chip } from "@mui/material";
import Custom from "@/components/Widgets/Custom";
import { DISEASES } from "./const";
import "./ControlWidget.css";
import useDashboardStore from "@/state/dashboard";
import shallow from "zustand/shallow";
const ControlWidget = () => {
  const { additionalState, changeAdditionalStateProperty } = useDashboardStore(
    (state) => ({
      additionalState: state.additionalState,
      changeAdditionalStateProperty: state.changeAdditionalStateProperty
    }),
    shallow
  );
  const selectWidgetChild = useDashboardStore((state) => state.selectWidgetChild);

  return (
    <Custom>
      <div className="chips-container">
        {DISEASES.map((disease, index) => {
          const selected = index === additionalState.selectedChip;
          const color = selected ? "chipSelected" : undefined;
          return (
            <div>
              <Chip
                label={selected ? <strong>{disease.name}</strong> : disease.name}
                color={color}
                onClick={() => {
                  selectWidgetChild(0, 1, index);
                  selectWidgetChild(0, 2, index);
                  selectWidgetChild(0, 3, index);
                  selectWidgetChild(0, 4, index);
                  changeAdditionalStateProperty("selectedChip", index);
                }}
              />
            </div>
          );
        })}
        <div>
          <Chip label="TO BE ADDED MORE..." />
        </div>
      </div>
    </Custom>
  );
};

export default ControlWidget;

import { Chip } from "@mui/material";
import Custom from "@/components/Widgets/Custom";
import { DISEASES } from "./const";
import "./ControlWidget.css";
import { useState } from "react";
import useDashboardStore from "@/state/dashboard";
const ControlWidget = () => {
  const selectWidgetChild = useDashboardStore((state) => state.selectWidgetChild);
  const [selectedChip, setSelectedChip] = useState(0);

  return (
    <Custom>
      <div className="chips-container">
        {DISEASES.map((disease, index) => {
          const selected = index === selectedChip;
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
                  setSelectedChip(index);
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

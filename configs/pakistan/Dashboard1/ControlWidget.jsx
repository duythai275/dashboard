import { Chip } from "@mui/material";
import Custom from "@/components/Widgets/Custom";
import { DISEASES } from "./const";
import "./ControlWidget.css";
import useDashboardStore from "@/state/dashboard";
import shallow from "zustand/shallow";
import { useEffect } from "react";
const layout1 = [
  { i: "control", x: 0, y: 0, w: 12, h: 14 },
  { i: "1", x: 0, y: 14, w: 6, h: 48 },
  { i: "2", x: 6, y: 14, w: 6, h: 48 },
  { i: "3", x: 0, y: 62, w: 12, h: 48 },
  { i: "4", x: 0, y: 110, w: 12, h: 48 }
];
const layout2 = [{ i: "control", x: 0, y: 0, w: 12, h: 14 }];

let y = 14;
DISEASES.forEach((disease, index) => {
  layout2.push({ i: "1" + index, x: 0, y: y, w: 6, h: 48 });
  layout2.push({ i: "2" + index, x: 7, y: y, w: 6, h: 48 });
  layout2.push({ i: "3" + index, x: 0, y: y + 48, w: 12, h: 48 });
  layout2.push({ i: "4" + index, x: 0, y: y + 48 + 48, w: 12, h: 48 });
  y += 96;
});

const ControlWidget = () => {
  const { selectWidgetChild, changeDashboardState } = useDashboardStore(
    (state) => ({ selectWidgetChild: state.selectWidgetChild, changeDashboardState: state.changeDashboardState }),
    shallow
  );

  const { additionalState, changeAdditionalStateProperty, layout, changeLayout } = useDashboardStore(
    (state) => ({
      layout: state.layout,
      changeLayout: state.changeLayout,
      additionalState: state.additionalState,
      changeAdditionalStateProperty: state.changeAdditionalStateProperty
    }),
    shallow
  );

  useEffect(() => {
    changeAdditionalStateProperty("selectedLayout", "layout1");
    changeLayout(layout1);
  }, []);

  return (
    <Custom>
      <div className="chips-container">
        {(() => {
          const selected = additionalState.selectedChip === "all";
          const color = selected ? "chipSelected" : undefined;
          return (
            <div>
              <Chip
                label={selected ? <strong>All Diseases (coming soon)</strong> : "All Diseases"}
                color={color}
                onClick={() => {
                  changeLayout(layout2);
                  changeAdditionalStateProperty("selectedChip", "all");
                  changeAdditionalStateProperty("selectedLayout", "layout2");
                  const widgets = [{ selectedChildren: 0 }];
                  DISEASES.forEach((disease, index) => {
                    widgets.push(
                      ...[
                        { selectedChildren: 0 },
                        { selectedChildren: 0 },
                        { selectedChildren: 0 },
                        { selectedChildren: 0 }
                      ]
                    );
                    // selectWidgetChild(0, 1 + 4 * index, 0);
                    // selectWidgetChild(0, 2 + 4 * index, 0);
                    // selectWidgetChild(0, 3 + 4 * index, 0);
                    // selectWidgetChild(0, 4 + 4 * index, 0);
                  });
                  changeDashboardState(0, { widgets });
                }}
              />
            </div>
          );
        })()}

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
                  changeLayout(layout1);
                  changeAdditionalStateProperty("selectedChip", index);
                  changeAdditionalStateProperty("selectedLayout", "layout1");
                }}
              />
            </div>
          );
        })}
      </div>
    </Custom>
  );
};

export default ControlWidget;

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import RGL, { WidthProvider } from "react-grid-layout";
const ReactGridLayout = WidthProvider(RGL);

import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import useDashboardStore from "@/state/dashboard";
import Widget1 from "./widgets/widget1";
import Widget2 from "./widgets/widget2";
import Widget3 from "./widgets/widget3";
import Widget4 from "./widgets/Widget4";
import { shallow } from "zustand/shallow";
import Popover from "@mui/material/Popover/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import PeriodSelector from "@/components/PeriodSelector/PeriodSelector";
import DateRangeInput from "./components/DateRangeInput";

const WidgetControlButton = ({ periodType, additionalStateKey }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const changeAdditionalStateProperty = useDashboardStore(
    (state) => state.changeAdditionalStateProperty,
    shallow
  );

  return (
    <div>
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <FontAwesomeIcon icon={faGear} style={{ fontSize: 20 }} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {periodType !== "dateRange" ? (
          <PeriodSelector
            periodType={periodType}
            handler={(period) => {
              changeAdditionalStateProperty(additionalStateKey, period);
            }}
            initValue={additionalStateKey}
          />
        ) : (
          <DateRangeInput
            onChange={(value) => {
              changeAdditionalStateProperty(additionalStateKey, value);
            }}
            additionalStateKey={additionalStateKey}
          />
        )}
      </Popover>
    </div>
  );
};

const CaseCovid19Dashboard = () => {
  const { t } = useTranslation();

  return (
    <ReactGridLayout
      isDraggable={false}
      layout={[
        { i: "1", x: 0, y: 0, w: 12, h: 50 },
        { i: "2", x: 0, y: 50, w: 12, h: 50 },
        { i: "3", x: 0, y: 100, w: 12, h: 50 },
        { i: "4", x: 0, y: 150, w: 12, h: 50 },
      ]}
      cols={12}
      rowHeight={1}
      containerPadding={[0, 0]}
    >
      <WidgetContainer
        key="1"
        dashboardIndex={3}
        widgetIndex={0}
        childrenWidgets={[
          {
            title: t("widget1CaseCovid19DashboardTitle"),
            widget: <Widget1 />,
          },
        ]}
        controlButtons={[
          <WidgetControlButton
            periodType="dateRange"
            additionalStateKey="caseCovid19W1Period"
          />,
        ]}
      />
      <WidgetContainer
        key="2"
        dashboardIndex={3}
        widgetIndex={1}
        childrenWidgets={[
          {
            title: t("widget2CaseCovid19DashboardTitle"),
            widget: <Widget2 />,
          },
        ]}
        controlButtons={[
          <WidgetControlButton
            periodType="Yearly"
            additionalStateKey="caseCovid19W2Period"
          />,
        ]}
      />
      <WidgetContainer
        key="3"
        dashboardIndex={3}
        widgetIndex={2}
        childrenWidgets={[
          {
            title: t("widget3CaseCovid19DashboardTitle"),
            widget: <Widget3 />,
          },
        ]}
        controlButtons={[
          <WidgetControlButton
            periodType="Yearly"
            additionalStateKey="caseCovid19W2Period"
          />,
        ]}
      />
      <WidgetContainer
        key="4"
        dashboardIndex={3}
        widgetIndex={3}
        childrenWidgets={[
          {
            title: t("widget4CaseCovid19DashboardTitle"),
            widget: <Widget4 />,
          },
        ]}
        controlButtons={[
          <WidgetControlButton
            periodType="Yearly"
            additionalStateKey="caseCovid19W2Period"
          />,
        ]}
      />
    </ReactGridLayout>
  );
};

export default CaseCovid19Dashboard;

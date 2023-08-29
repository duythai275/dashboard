import React, { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import RGL, { WidthProvider } from "react-grid-layout";
import { IconButton, Popover } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import PeriodSelector from "@/components/PeriodSelector/PeriodSelector";
const ReactGridLayout = WidthProvider(RGL);
import useDashboardStore from "@/state/dashboard";
import WidgetContainer from "@/components/WidgetContainer/WidgetContainer";
import { Widget1, Widget1a, Widget2
    // , Widget3, Widget4 
} from "./widgets";

const WidgetControlButton = ({ periodType, periodProperty }) => {
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
                <PeriodSelector
                    periodType={periodType}
                    initValue={periodProperty}
                    handler={(period) => {
                        changeAdditionalStateProperty(periodProperty, period);
                    }}
                />
            </Popover>
        </div>
      );
}

const Dashboard1 = () => {
    return (
        <ReactGridLayout
            isDraggable={false}
            layout={[
              { i: "1", x: 0, y: 0, w: 6, h: 50 },
              { i: "2", x: 6, y: 0, w: 6, h: 50 },
            //   { i: "3", x: 0, y: 50, w: 6, h: 50 },
            //   { i: "4", x: 6, y: 50, w: 6, h: 50 },
            ]}
            cols={12}
            rowHeight={1}
            containerPadding={[0, 0]}
        >
            <WidgetContainer
                key="1"
                widgetIndex={0}
                dashboardIndex={0}
                childrenWidgets={[
                    { title: "Widget 1", widget: <Widget1 /> },
                    { title: "Widget 1a", widget: <Widget1a /> },
                ]}
            />
            <WidgetContainer
                key="2"
                widgetIndex={1}
                dashboardIndex={0}
                childrenWidgets={[
                    { title: "Widget 2", widget: <Widget2 /> }
                ]}
                controlButtons={[
                    <WidgetControlButton
                        periodType="Monthly"
                        periodProperty="periodForW1"
                    />
                ]}
            />
            {/* <WidgetContainer
                key="3"
                widgetIndex={2}
                dashboardIndex={0}
                childrenWidgets={[
                    {
                        title: "Widget 3",
                        widget: <></>
                    }
                ]}
            />
            <WidgetContainer
                key="4"
                widgetIndex={3}
                dashboardIndex={0}
                childrenWidgets={[
                    {
                        title: "Widget 4",
                        widget: <></>
                    }
                ]}
            /> */}
        </ReactGridLayout>
    )
}

export default Dashboard1;
import React, { useState } from "react";
import { Typography, IconButton, Popover, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";
import "./WidgetContainer.css";
import "../Widgets/Widgets.css";

const WidgetContainer = (props, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { style, className, onMouseDown, onMouseUp, onTouchEnd, dashboardIndex, widgetIndex, childrenWidgets } = props;
  const { dashboardState, selectWidgetChild } = useDashboardStore(
    (state) => ({
      dashboardState: state.dashboardState,
      selectWidgetChild: state.selectWidgetChild
    }),
    shallow
  );
  const selectedChildrenIndex = dashboardState[dashboardIndex].widgets[widgetIndex].selectedChildren;

  const currentTitle = childrenWidgets[selectedChildrenIndex]?.title;
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={`${className} widget-container`}
      style={{ ...style }}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
    >
      <div className="widget-title" style={{ width: childrenWidgets.length === 1 ? "100%" : undefined }}>
        <div>
          <Typography variant="widgetTitle">{currentTitle}</Typography>
        </div>
        {childrenWidgets.length > 1 && (
          <div>
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} style={{ fontSize: 22 }} />
            </IconButton>
          </div>
        )}
      </div>
      <div className="widget-content">{childrenWidgets[selectedChildrenIndex].widget}</div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <div className="widget-children-selector-container">
          <List>
            {childrenWidgets.map((child, index) => {
              return (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      selectWidgetChild(dashboardIndex, widgetIndex, index);
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemText primary={child.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default React.forwardRef(WidgetContainer);

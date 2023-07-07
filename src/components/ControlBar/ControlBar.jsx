import DashboardSelector from "./DashboardSelector";
import DashboardButtons from "./DashboardButtons";
import { customControl } from "@/config/config";

import "./ControlBar.css";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import {
  faBars,
  faCircleInfo,
  faCircleXmark,
  faInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ControlBar = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = (e) => {
      const width = e.target.innerWidth;
      if (width > 900) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="control-bar-container">
      <div>
        <DashboardSelector />
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
      </div>
      <div>{customControl}</div>
      <div>
        <DashboardButtons />
      </div>
      <Box className="visible-in-mobile">
        <Box
          onClick={(event) => {
            setOpen(false);
          }}
          sx={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            transition: "all 0.5s ease-in-out",
            visibility: open ? "visible" : "hidden",
            opacity: open ? "1" : "0",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: "999",
          }}
        />
        <Box
          sx={{
            padding: open ? "10px" : "0",
            display: "flex",
            right: open ? "0" : "-50vw",
            position: "absolute",
            width: open ? "50vw" : 0,
            height: "100%",
            overflow: "hidden",
            top: 0,
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255)",
            zIndex: 1000,
            transition: "all 0.5s ease-in-out",
            opacity: open ? 1 : 0,
            alignItems: "center",
            // justifyContent: "center",
            gap: "20px",
          }}
        >
          <IconButton
            sx={{ alignSelf: "start" }}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
          <div>{customControl}</div>
          <div>
            <DashboardButtons />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ControlBar;

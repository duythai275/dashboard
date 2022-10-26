import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./i18n";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "leaflet/dist/leaflet.css";
import "@inovua/reactdatagrid-community/index.css";
const { VITE_APP_MODE, VITE_FONT } = import.meta.env;
import { defaults } from "chart.js";
defaults.font.family = VITE_FONT;

if (VITE_APP_MODE === "development") {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}

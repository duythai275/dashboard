import * as dotenv from "dotenv";
import path from "path";
import express from "express";
import { getRefreshToken, getOrgUnits, getGeoJson } from "./src/api.js";
dotenv.config();
const { VITE_APP_MODE, VITE_MODE } = process.env;
const app = express();
const port = VITE_APP_MODE === "development" ? 3001 : 80;
// const apis = VITE_MODE === "development" ? require("../src/config/apiConfig") : require("./src/dashboardApi");
// import apis from VITE_MODE === "development" ? "../src/config/apiConfig.js" :""

const refreshToken = async () => {
  const dhis2Api = await getRefreshToken();
  app.set("dhis2Api", dhis2Api);
};

const startServer = async () => {
  await refreshToken();
  const { default: defaultImport } = await import(
    VITE_APP_MODE === "development" ? "../src/config/apiConfig.js" : "./src/dashboardApi.js"
  );
  app.use("/assets", express.static("assets"));

  setInterval(() => {
    refreshToken();
  }, 3600000);

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("../index.html"));
  });

  app.get("/api/orgUnits", async (req, res) => {
    const result = await getOrgUnits(req.app.get("dhis2Api"));
    res.json(result);
  });

  app.get("/api/orgUnitGeoJson", async (req, res) => {
    const result = await getGeoJson(req.app.get("dhis2Api"));
    res.json(result);
  });

  defaultImport.forEach((api) => {
    app.get(api.route, async (req, res) => {
      const result = await api.handler(req.app.get("dhis2Api"));
      res.json(result);
    });
  });

  app.listen(port, () => {
    console.log(`External dashboard is now running on port ${port}`);
  });
};

startServer();

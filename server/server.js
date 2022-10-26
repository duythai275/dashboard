require("dotenv").config();
const { VITE_APP_MODE, VITE_MODE } = process.env;
const path = require("path");
const express = require("express");
const app = express();
const port = VITE_APP_MODE === "development" ? 3001 : 80;
const { getRefreshToken, getOrgUnits, getGeoJson } = require("./src/api");
const api = VITE_MODE === "development" ? require("../src/config/api") : require("./src/dashboardApi");

const refreshToken = async () => {
  const dhis2Api = await getRefreshToken();
  app.set("dhis2Api", dhis2Api);
};

const startServer = async () => {
  await refreshToken();
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

  api.forEach((api) => {
    app.get(api.route, async (req, res) => {
      const result = await api.handler(req.app.get("dhis2Api"));
      res.json(result);
    });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();

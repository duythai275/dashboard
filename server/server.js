require("dotenv").config();
const express = require("express");
const path = require("path");
const { generateOauth2Api, generateBasicApi } = require("./src/api.js");
// dotenv.config();
const { VITE_APP_MODE, VITE_CONFIG_NAME } = process.env;
const isProduction = VITE_APP_MODE === "production";
const app = express();
const port = isProduction ? 80 : 3001;

const generateDhis2Apis = async (dhis2ApiConfigs) => {
  const dhis2Apis = await Promise.all(
    dhis2ApiConfigs.map(async (config) => {
      if (config.type === "basic") {
        return generateBasicApi(config);
      } else {
        return generateOauth2Api(config);
      }
    })
  );
  app.set("dhis2Apis", dhis2Apis);
};

const startServer = async () => {
  app.use("/assets", express.static("assets"));

  const { default: defaultImport } = await import(isProduction ? "./src/dashboardApi.js" : `../configs/${VITE_CONFIG_NAME}/backend/apiConfig.js`);
  const { dhis2ApiConfigs, apis } = defaultImport;

  await generateDhis2Apis(dhis2ApiConfigs);

  setInterval(() => {
    generateDhis2Apis(dhis2ApiConfigs);
  }, 3600000);

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./index.html"));
  });

  // app.get("/api/orgUnits", async (req, res) => {
  //   const result = await getOrgUnits(req.app.get("dhis2Apis")[req.query.apiIndex]);
  //   res.json(result);
  // });

  // app.get("/api/orgUnitGeoJson", async (req, res) => {
  //   const result = await getGeoJson(req.app.get("dhis2Apis")[req.query.apiIndex]);
  //   res.json(result);
  // });

  apis.forEach((api) => {
    app.get(api.route, async (req, res) => {
      const result = await api.handler(req.app.get("dhis2Apis"), req);
      res.json(result);
    });
  });

  app.listen(port, () => {
    console.log(`External dashboard is now running on port ${port}`);
  });
};

startServer();

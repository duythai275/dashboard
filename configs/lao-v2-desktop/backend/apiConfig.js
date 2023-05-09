const { apisDashboard1 } = require("./dashboard1");
const { apisDashboard2 } = require("./dashboard2");
const { apisDashboard3 } = require("./dashboard3");
const { apisDashboard4 } = require("./dashboard4");
const { apisDashboard5 } = require("./dashboard5");
const { apisDashboard6 } = require("./dashboard6");
const { apisGeneral } = require("./general");

require("dotenv").config();
const {
  VITE_HMIS_BASE_URL,
  VITE_HMIS_USERNAME,
  VITE_HMIS_PASSWORD,
  VITE_FHIS_BASE_URL,
  VITE_FHIS_USERNAME,
  VITE_FHIS_PASSWORD,
} = process.env;

const apis = [
  ...apisGeneral,
  ...apisDashboard1,
  ...apisDashboard2,
  ...apisDashboard3,
  ...apisDashboard4,
  ...apisDashboard5,
  ...apisDashboard6,
];
const dhis2ApiConfigs = [
  // {
  //   //development
  //   baseUrl: "https://hmis.gov.la/hmis",
  //   // clientId: "hmispublicdashboarddev",
  //   // clientSecret: "bfed13089-0720-194f-462c-69827851837",
  //   // refreshToken: "DZyrPbXtdJPW8eTCMLwhXWLvGXU"
  //   //production
  //   //baseUrl:"http://10.201.48.100:8080/hmis",
  //   clientId: "hmispublicdashboard",
  //   clientSecret: "057de9135-d058-a911-9a07-3dffaf5e44b",
  //   refreshToken: "krikloya8mGrqSWpMuPFEaaS-Dw"
  // },
  // {
  //   //development
  //   baseUrl: "https://dhis2.world/survey",
  //   //clientId: "surveypublicdashboarddev",
  //   //clientSecret: "a03f6bf84-87e8-5da7-eed6-5f821430c75",
  //   //refreshToken: "4WGNayPyTfZn6xLeLohZy3kNVak"
  //   //production
  //   //baseUrl:"http://10.201.48.100:8080/hmis",
  //   clientId: "surveypublicdashboard",
  //   clientSecret: "eebc7d604-21d1-3457-bb61-1c6175b442e",
  //   refreshToken: "L2_1DKZ6o7D4loFVd4javLWOd-Y"
  // },
  {
    type: "basic",
    baseUrl: VITE_HMIS_BASE_URL,
    username: VITE_HMIS_USERNAME,
    password: VITE_HMIS_PASSWORD,
  },
  {
    type: "basic",
    baseUrl: VITE_FHIS_BASE_URL,
    username: VITE_FHIS_USERNAME,
    password: VITE_FHIS_PASSWORD,
  },
  // {
  //   type: "basic",
  //   baseUrl: VITE_SURVEY_BASE_URL,
  //   username: VITE_SURVEY_USERNAME,
  //   password: VITE_SURVEY_PASSWORD,
  // },
];

module.exports = { apis, dhis2ApiConfigs };

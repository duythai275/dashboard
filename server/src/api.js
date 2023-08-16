require("dotenv").config();
const axios = require("axios");
const qs = require("qs");

const generateOauth2Api = async (config) => {
  const { baseUrl, clientId, clientSecret, refreshToken } = config;
  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });

  const result = await axios({
    method: "post",
    url: `${baseUrl}/uaa/oauth/token`,
    headers: {
      Authorization: `Basic ` + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  });

  const dhis2Api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: "Bearer " + result.data.access_token
    }
  });
  return dhis2Api;
};

const generateBasicApi = async (config) => {
  const { baseUrl, username, password } = config;

  const dhis2Api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    }
  });
  return dhis2Api;
};

const generatePatApi = async (config) => {
  const { baseUrl, pat } = config;

  const dhis2Api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: pat
    }
  });
  return dhis2Api;
};

const getOrgUnits = async (dhis2Api) => {
  const result = await dhis2Api.get("/api/organisationUnits?paging=false&fields=id,name,displayName,parent,path,ancestors,translations");
  return result.data.organisationUnits;
};

const getGeoJson = async (dhis2Api) => {
  const orgUnitLevelsResult = await dhis2Api.get(`/api/organisationUnitLevels.json?fields=level,displayName`);
  const levelQueryString = orgUnitLevelsResult.data.organisationUnitLevels.map((oul) => "level=" + oul.level);
  const orgUnitGeoJsonResult = await dhis2Api.get(`/api/organisationUnits.geojson?${levelQueryString.join("&")}`);
  return orgUnitGeoJsonResult.data;
};

module.exports = { generateOauth2Api, generateBasicApi, generatePatApi, getOrgUnits, getGeoJson };

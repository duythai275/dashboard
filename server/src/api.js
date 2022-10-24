const { VITE_BASE_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_REFRESH_TOKEN } = process.env;
const axios = require("axios");
const qs = require("qs");

const getRefreshToken = async () => {
  const data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: VITE_REFRESH_TOKEN
  });

  const result = await axios({
    method: "post",
    url: `${VITE_BASE_URL}/uaa/oauth/token`,
    headers: {
      Authorization: `Basic ` + Buffer.from(VITE_CLIENT_ID + ":" + VITE_CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  });

  const dhis2Api = axios.create({
    baseURL: VITE_BASE_URL,
    headers: {
      Authorization: "Bearer " + result.data.access_token
    }
  });
  return dhis2Api;
};

const getOrgUnits = async (dhis2Api) => {
  const result = await dhis2Api.get("/api/organisationUnits?paging=false&fields=id,displayName,parent,path,ancestors");
  return result.data.organisationUnits;
};

const getGeoJson = async (dhis2Api) => {
  const orgUnitLevelsResult = await dhis2Api.get(`/api/organisationUnitLevels.json?fields=level,displayName`);
  const levelQueryString = orgUnitLevelsResult.data.organisationUnitLevels.map((oul) => "level=" + oul.level);
  const orgUnitGeoJsonResult = await dhis2Api.get(`/api/organisationUnits.geojson?${levelQueryString.join("&")}`);
  return orgUnitGeoJsonResult.data;
};

module.exports = { getRefreshToken, getOrgUnits, getGeoJson };

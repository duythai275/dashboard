import axios from "axios";
const { VITE_APP_MODE, VITE_PRODUCTION_BASE } = import.meta.env;

const getOrgUnits = async () => {
  const result = await axios.get(`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/orgUnits`);
  return result.data;
};

const getGeoJson = async () => {
  const result = await axios.get(`${VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : ""}/api/orgUnitGeoJson`);
  return result.data;
};

const getData = async (api) => {
  const result = await axios.get(api);
  return result;
};

const externalApi = {
  getOrgUnits,
  getGeoJson,
  getData
};

export default externalApi;

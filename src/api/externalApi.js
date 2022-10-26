import axios from "axios";

const getOrgUnits = async () => {
  const result = await axios.get(`/api/orgUnits`);
  return result.data;
};
const getGeoJson = async () => {
  const result = await axios.get(`/api/orgUnitGeoJson`);
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

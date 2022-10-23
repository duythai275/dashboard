import axios from "axios";

const getOrgUnits = async () => {
  const result = await axios.get(`/api/orgUnits`);
  return result.data;
};

const externalApi = {
  getOrgUnits
};

export default externalApi;

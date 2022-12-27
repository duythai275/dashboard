const apis = [
  {
    route: "/api/getLtUnits",
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get("/api/organisationUnits?pageSize=10");
      //convert
      return result.data;
    }
  },
  {
    route: "/api/getD1W1Data",
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get("/api/dataElements?pageSize=10");

      return result.data.dataElements.map((de) => ({
        ma: de.id,
        ten: de.displayName
      }));
    }
  }
];
const dhis2ApiConfigs = [
  {
    baseUrl: "https://hispvn.org/laotracker36",
    clientId: "workshoppublicdashboarddev",
    clientSecret: "d2f3806c0-e90d-3ab8-990e-f05e0a36ed2",
    refreshToken: "HKvpNTSKSEZK_ZZ2XqlXthUQu-g"
  }
];

export default { apis, dhis2ApiConfigs };

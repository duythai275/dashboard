const apis = [
  {
    route: `/api/test`,
    handler: async (dhis2Apis) => {
      const dataElements = await dhis2Apis[0].get("/api/indicators");
      return dataElements.data;
    }
  }
];
const dhis2ApiConfigs = [
  {
    baseUrl: "https://hmis.gov.la/hmis",
    clientId: "hmispublicdashboard",
    clientSecret: "057de9135-d058-a911-9a07-3dffaf5e44b",
    refreshToken: "vnyxj3i2c14JllFWnmPKn9t7x0E"
  }
];

export default { apis, dhis2ApiConfigs };

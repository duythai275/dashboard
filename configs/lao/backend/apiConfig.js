import { getOrgUnits } from "../../../server/src/api.js";

const apis = [
  {
    route: `/api/orgUnits`,
    handler: async (dhis2Apis) => {
      const result = await getOrgUnits(dhis2Apis[0]);
      return result.map((ou) => {
        const foundNameLo = ou.translations.find(
          (translation) => translation.property === "NAME" && translation.locale === "lo"
        );
        return {
          id: ou.id,
          nameEn: ou.name,
          nameLo: foundNameLo ? foundNameLo.value : ou.name
        };
      });
    }
  },
  {
    route: `/api/getWidget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:cXVnVexZM2V.REPORTING_RATE&dimension=ou:FRmrFTE63D0;K27JzTKmBKh;MBZYTqkEgwf;RdNV4tTRNEo;TOgZ99Jv0bN;VWGSudnonm5;W6sNfkJcXGC;XKGgynPS1WZ;YvLOmtTQD6b;c4HrGRJoarj;dOhqCNenSjS;hRQsZhmvqgS;hdeC7uX9Cko;pFCZqWnXtoU;quFXhkOJGB4;rO2RVJWHpCe;sv6c7CpPcrc;vBWtCmNNnCG&filter=pe:LAST_YEAR&includeNumDen=false&skipData=false&skipMeta=false"
      );
      const response = result.data.rows
        .map((row) => ({ ou: row[1], value: parseFloat(row[2]) }))
        .sort((a, b) => b.value - a.value);

      return response;
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

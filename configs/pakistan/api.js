const moment = require("moment");
const api = [
  {
    route: "/api/getWidget1Data",
    handler: async (dhis2Api) => {
      const result = await dhis2Api.get(
        "/api/analytics.json?dimension=dx:BPlRFHPfdu6&dimension=ou:OU_GROUP-khLZ5r8LECn;OU_GROUP-nGvoD40dmsW;OU_GROUP-nghPhW1NSUI;OU_GROUP-sejzgrTy21D;OU_GROUP-xsris5MPojs&dimension=pe:LAST_30_DAYS&displayProperty=NAME&skipData=false"
      );

      const currentData = {};

      result.data.rows.forEach((row) => {
        const ou = row[1];
        const period = moment(row[2]).format("YYYY-MM-DD");
        const value = parseFloat(row[3]);
        if (currentData[period]) {
          currentData[period][ou] = value;
        } else {
          currentData[period] = {};
          currentData[period][ou] = value;
        }
      });

      return currentData;
    }
  },
  {
    route: "/api/getWidget2Data",
    handler: async (dhis2Api) => {
      const result = await dhis2Api.get(
        "/api/analytics.json?dimension=dx:BPlRFHPfdu6&dimension=pe:LAST_30_DAYS&filter=ou:OU_GROUP-khLZ5r8LECn;OU_GROUP-nGvoD40dmsW;OU_GROUP-nghPhW1NSUI;OU_GROUP-sejzgrTy21D;OU_GROUP-xsris5MPojs&includeNumDen=false&skipData=false&skipMeta=true"
      );

      const data = {};

      result.data.rows.forEach((row) => {
        const period = moment(row[1]).format("YYYY-MM-DD");
        const value = parseFloat(row[2]);
        data[period] = value;
      });

      return data;
    }
  }
];

module.exports = api;

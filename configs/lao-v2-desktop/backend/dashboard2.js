const moment = require("moment");

const apisDashboard2 = [
  {
    route: `/api/getDashboard2Widget8Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics?dimension=dx:Q21U47uf0xo.REPORTING_RATE;w8XQmI94Spv.REPORTING_RATE;Q21U47uf0xo.REPORTING_RATE_ON_TIME;w8XQmI94Spv.REPORTING_RATE_ON_TIME&filter=pe:LAST_12_MONTHS&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget14_15_17Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 0; i <= 2; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:QxmjNDdZSSS&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget3Data`,
    handler: async (dhis2Apis) => {
      const month = moment().month() + 1;
      const year = moment().year();
      const pes = [
        `${year}${month >= 10 ? month : `0${month}`}`,
        `${year - 1}${month >= 10 ? month : `0${month}`}`,
      ];
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget4_2Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 0; i <= 2; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget5_2Data`,
    handler: async (dhis2Apis) => {
      const month = moment().month() + 1;
      const year = moment().year();
      const pes = [
        `${year}${month >= 10 ? month : `0${month}`}`,
        `${year}${month - 1 >= 10 ? month - 1 : `0${month - 1}`}`,
        `${year}${month - 2 >= 10 ? month - 2 : `0${month - 2}`}`,
      ];
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget6Data`,
    handler: async (dhis2Apis) => {
      const year = moment().year();
      const pes = [`${year}`];
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget2Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 0; i <= 1; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:Nt5y1WYCqv3&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
];

module.exports = { apisDashboard2 };

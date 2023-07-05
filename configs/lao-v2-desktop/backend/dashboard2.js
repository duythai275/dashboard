const moment = require("moment");

const apisDashboard2 = [
  {
    route: `/api/getDashboard2Widget8Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 1; i < month; i++) {
        pes.push(`${year}${i > 9 ? i : `0${i}`}`);
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics?dimension=dx:Q21U47uf0xo.REPORTING_RATE;w8XQmI94Spv.REPORTING_RATE;Q21U47uf0xo.REPORTING_RATE_ON_TIME;w8XQmI94Spv.REPORTING_RATE_ON_TIME&filter=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=true&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget14_15_16Data`,
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
        `${year}${month - 1 >= 10 ? month - 1 : `0${month - 1}`}`,
        `${year - 1}${month - 1 >= 10 ? month - 1 : `0${month - 1}`}`,
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
      let pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      if (month === 1) {
        pes.push(`${year - 1}12`);
      }
      pes.push(`${year}${month - 1 >= 10 ? month - 1 : `0${month - 1}`}`);
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard2Widget7Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:r2wLxYXH75x&dimension=pe:LAST_MONTH&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
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

const moment = require("moment");

const apisDashboard3 = [
  {
    route: `/api/getDashboard3Widget1Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 0; i <= 4; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:SkPFKyJsIWJ;M0tpdbr1kmC;SkPFKyJsIWJ&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard3Widget2Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 0; i <= 4; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:SkPFKyJsIWJ;SkPFKyJsIWJ;M0tpdbr1kmC&dimension=pe:${pes.join(
          ";"
        )}&filter=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  // {
  //   route: `/api/getDashboard3Widget456Data`,
  //   handler: async (dhis2Apis) => {
  //     const pes = [];
  //     const month = moment().month() + 1;
  //     const year = moment().year();
  //     for (let i = 0; i <= 4; i++) {
  //       for (let j = i > 0 ? 12 : month; j >= 1; j--) {
  //         pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
  //       }
  //     }
  //     const result = await dhis2Apis[0].get(
  //       `/api/analytics.json?dimension=dx:ZGuni8UTDTK;U2Tmx7kjSzc;OjUHkTCv6cd&dimension=pe:${pes.join(
  //         ";"
  //       )}&filter=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
  //     );
  //     return result.data;
  //   },
  // },
  {
    route: `/api/getDashboard3Widget910Data`,
    handler: async (dhis2Apis) => {
      const year = moment().year();
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:M0tpdbr1kmC;SkPFKyJsIWJ&dimension=pe:${year}&dimension=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard3Widget1112Data`,
    handler: async (dhis2Apis) => {
      const year = moment().year();
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx%3AGd5efmbROUX.REPORTING_RATE%3BGd5efmbROUX.REPORTING_RATE_ON_TIME&dimension=ou%3AW6sNfkJcXGC%3BYvLOmtTQD6b%3BXKGgynPS1WZ%3BrO2RVJWHpCe%3BFRmrFTE63D0%3BMBZYTqkEgwf%3BhdeC7uX9Cko%3BRdNV4tTRNEo%3BVWGSudnonm5%3BquFXhkOJGB4%3BvBWtCmNNnCG%3Bc4HrGRJoarj%3BpFCZqWnXtoU%3BTOgZ99Jv0bN%3BdOhqCNenSjS%3Bsv6c7CpPcrc%3BhRQsZhmvqgS%3BK27JzTKmBKh%3BIWp9dQGM0bS&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=pe:${year}`
      );
      return result.data;
    },
  },
  // {
  //   route: `/api/getDashboard3Widget12Data`,
  //   handler: async (dhis2Apis) => {
  //     const result = await dhis2Apis[0].get(
  //       `/api/analytics.json?dimension=dx%3Aw8XQmI94Spv.REPORTING_RATE%3Bw8XQmI94Spv.REPORTING_RATE_ON_TIME%3BQ21U47uf0xo.REPORTING_RATE%3BQ21U47uf0xo.REPORTING_RATE_ON_TIME&dimension=ou%3AW6sNfkJcXGC%3BYvLOmtTQD6b%3BXKGgynPS1WZ%3BrO2RVJWHpCe%3BFRmrFTE63D0%3BMBZYTqkEgwf%3BhdeC7uX9Cko%3BRdNV4tTRNEo%3BVWGSudnonm5%3BquFXhkOJGB4%3BvBWtCmNNnCG%3Bc4HrGRJoarj%3BpFCZqWnXtoU%3BTOgZ99Jv0bN%3BdOhqCNenSjS%3Bsv6c7CpPcrc%3BhRQsZhmvqgS%3BK27JzTKmBKh&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=pe%3ALAST_12_MONTHS`
  //     );
  //     return result.data;
  //   },
  // },
];

module.exports = { apisDashboard3 };

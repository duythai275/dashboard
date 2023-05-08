const moment = require("moment");

const apisDashboard1 = [
  {
    route: `/api/getDashboard1Widget6Data`,
    handler: async (dhis2Apis) => {
      const pes = [];
      let month = moment().month() + 1;
      let year = moment().year();
      while (true) {
        if (pes.length === 36) {
          break;
        }
        if (month === 0) {
          year -= 1;
          month = 12;
          pes.push(`${year}${month}`);
        } else {
          pes.push(`${year}${month > 9 ? month : `0${month}`}`);
        }
        month -= 1;
      }
      for (let i = 0; i <= 4; i++) {
        for (let j = i > 0 ? 12 : month; j >= 1; j--) {
          pes.push(`${year - i}${j >= 10 ? j : `0${j}`}`);
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:j6KMK39OsGk;LQDrtIwibHf;yU7jURi1DCf&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard1Widget9Data`,
    handler: async (dhis2Apis) => {
      const result = await Promise.all([
        dhis2Apis[0].get(
          "/api/analytics.json?dimension=dx:hPrLP02dias.REPORTING_RATE&dimension=ou:FRmrFTE63D0;IWp9dQGM0bS;K27JzTKmBKh;MBZYTqkEgwf;RdNV4tTRNEo;TOgZ99Jv0bN;VWGSudnonm5;W6sNfkJcXGC;XKGgynPS1WZ;YvLOmtTQD6b;c4HrGRJoarj;dOhqCNenSjS;hRQsZhmvqgS;hdeC7uX9Cko;pFCZqWnXtoU;quFXhkOJGB4;rO2RVJWHpCe;sv6c7CpPcrc;vBWtCmNNnCG&dimension=pe:LAST_4_WEEKS;LAST_MONTH&includeNumDen=true&skipData=false&skipMeta=false"
        ),
        dhis2Apis[0].get(
          "/api/legendSets?fields=id%2Clegends%5Bid%2CdisplayName~rename(name)%2CstartValue%2CendValue%2Ccolor%5D&filter=id%3Ain%3A%5Bpjqi9ASXG0w%5D"
        ),
      ]);
      const response = {
        data: result[0].data.rows.map((row) => ({
          ou: row[1],
          pe: row[2],
          value: parseInt(row[3]),
        })),
        legendSets: result[1].data.legendSets,
        pes: result[0].data.metaData.dimensions.pe,
      };
      return response;
    },
  },
  {
    route: `/api/getDashboard1Widget13Data`,
    handler: async (dhis2Apis) => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const pe =
        month > 2
          ? `${year}${month - 2 > 9 ? month - 2 : `0${month - 2}`}`
          : `${year - 1}${month + 10 > 9 ? month + 10 : `0${month + 10}`}`;
      const result = await Promise.all([
        dhis2Apis[0].get(
          `/api/analytics.json?dimension=dx:cTfAP7at6pN&dimension=ou:IWp9dQGM0bS;LEVEL-3&filter=pe:${pe}&displayProperty=NAME&skipData=false&skipMeta=false`
        ),
        dhis2Apis[0].get(
          "/api/legendSets/Y8vcHdmr6ZV?fields=%3Aall%2CattributeValues%5B%3Aall%2Cattribute%5Bid%2Cname%2CdisplayName%5D%5D"
        ),
      ]);
      const response = {
        data: result[0].data.rows.map((row) => ({
          ou: row[1],
          value: parseInt(row[2]),
        })),
        legends: result[1].data.legends,
      };
      return response;
    },
  },
  {
    route: `/api/getDashboard1Widget123Data`,
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
        `/api/analytics.json?dimension=dx:FSLrz90vXKf;cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq;kyVKK0JcRPJ;sISjKc2LEDg;j6KMK39OsGk;LQDrtIwibHf;yU7jURi1DCf&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard1Widget456Data`,
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
        `/api/analytics.json?dimension=dx:ZGuni8UTDTK;U2Tmx7kjSzc;OjUHkTCv6cd&dimension=pe:${pes.join(
          ";"
        )}&filter=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard1Widget10Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:ZGuni8UTDTK;U2Tmx7kjSzc;OjUHkTCv6cd&dimension=pe:LAST_MONTH&dimension=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard1Widget12Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx%3Aw8XQmI94Spv.REPORTING_RATE%3Bw8XQmI94Spv.REPORTING_RATE_ON_TIME%3BQ21U47uf0xo.REPORTING_RATE%3BQ21U47uf0xo.REPORTING_RATE_ON_TIME&dimension=ou%3AW6sNfkJcXGC%3BYvLOmtTQD6b%3BXKGgynPS1WZ%3BrO2RVJWHpCe%3BFRmrFTE63D0%3BMBZYTqkEgwf%3BhdeC7uX9Cko%3BRdNV4tTRNEo%3BVWGSudnonm5%3BquFXhkOJGB4%3BvBWtCmNNnCG%3Bc4HrGRJoarj%3BpFCZqWnXtoU%3BTOgZ99Jv0bN%3BdOhqCNenSjS%3Bsv6c7CpPcrc%3BhRQsZhmvqgS%3BK27JzTKmBKh&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=pe%3ATHIS_YEAR`
      );
      return result.data;
    },
  },
];

module.exports = { apisDashboard1 };

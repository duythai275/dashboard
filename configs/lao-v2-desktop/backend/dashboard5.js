const moment = require("moment");

const apisDashboard5 = [
  {
    route: `/api/getDashboard5Data`,
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
        `/api/analytics/events/aggregate/h6x4kyzKyK3.json?dimension=ou:W6sNfkJcXGC;YvLOmtTQD6b;XKGgynPS1WZ;rO2RVJWHpCe;FRmrFTE63D0;MBZYTqkEgwf;hdeC7uX9Cko;RdNV4tTRNEo;VWGSudnonm5;quFXhkOJGB4;vBWtCmNNnCG;c4HrGRJoarj;pFCZqWnXtoU;TOgZ99Jv0bN;dOhqCNenSjS;sv6c7CpPcrc;hRQsZhmvqgS;K27JzTKmBKh&dimension=pe:${pes.join(
          ";"
        )}&dimension=SoDTon4X8Kt.Dyq13cMGMzT:IN:1;2;3;4;5;6;8;9;10;11;12;13;14;15;16;17;18;7.1;7.2;7.3&stage=SoDTon4X8Kt&displayProperty=NAME&outputType=EVENT`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard5DataWidget16`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 1; i < month; i++) {
        pes.push(`${year}${i > 9 ? i : `0${i}`}`);
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx%3AhPrLP02dias.REPORTING_RATE&dimension=ou%3AW6sNfkJcXGC%3BK27JzTKmBKh%3BYvLOmtTQD6b%3BXKGgynPS1WZ%3BrO2RVJWHpCe%3BFRmrFTE63D0%3BMBZYTqkEgwf%3BhdeC7uX9Cko%3BRdNV4tTRNEo%3BVWGSudnonm5%3BquFXhkOJGB4%3BvBWtCmNNnCG%3Bc4HrGRJoarj%3BpFCZqWnXtoU%3BTOgZ99Jv0bN%3BdOhqCNenSjS%3Bsv6c7CpPcrc%3BhRQsZhmvqgS&dimension=pe:${pes.join(
          ";"
        )}&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard5DataWidget17`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 1; i < month; i++) {
        pes.push(`${year}${i > 9 ? i : `0${i}`}`);
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx%3AhPrLP02dias.REPORTING_RATE&dimension=ou%3AW6sNfkJcXGC%3BK27JzTKmBKh%3BYvLOmtTQD6b%3BXKGgynPS1WZ%3BrO2RVJWHpCe%3BFRmrFTE63D0%3BMBZYTqkEgwf%3BhdeC7uX9Cko%3BRdNV4tTRNEo%3BVWGSudnonm5%3BquFXhkOJGB4%3BvBWtCmNNnCG%3Bc4HrGRJoarj%3BpFCZqWnXtoU%3BTOgZ99Jv0bN%3BdOhqCNenSjS%3Bsv6c7CpPcrc%3BhRQsZhmvqgS&filter=pe:${pes.join(
          ";"
        )}&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard5EventData`,
    handler: async (dhis2Apis) => {
      const pes = [];
      const month = moment().month() + 1;
      const year = moment().year();
      for (let i = 1; i < month; i++) {
        pes.push(`${year}${i > 9 ? i : `0${i}`}`);
      }
      let flag = true;
      let page = 1;
      let values = null;
      while (flag) {
        const result = await dhis2Apis[0].get(
          `/api/analytics/events/query/h6x4kyzKyK3.json?dimension=pe:${pes.join(
            ";"
          )}&dimension=ou:IWp9dQGM0bS&dimension=SoDTon4X8Kt.Dyq13cMGMzT&stage=SoDTon4X8Kt&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=5000&page=${page}&totalPages=true`
        );
        if (page === 1) {
          values = result;
        }
        if (result.data.rows.length === 0) {
          flag = false;
        } else {
          if (page > 1) {
            values.data.rows = [...values.data.rows, ...result.data.rows];
          }
        }
        page++;
      }

      return values.data;
    },
  }
];

module.exports = { apisDashboard5 };

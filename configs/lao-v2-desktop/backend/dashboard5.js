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
];

module.exports = { apisDashboard5 };

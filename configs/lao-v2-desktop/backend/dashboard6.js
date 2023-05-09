const apisDashboard6 = [
  {
    route: `/api/getDashboard6Widget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:h8KiBz2888q;J5E8BkAoIWn;CyUEAFiwGTS;UnFoXigsKbu;ygsZjua2HcR;SkPFKyJsIWJ;js2VA67hWNA&filter=pe:LAST_12_MONTHS&filter=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard6Widget2Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:LpxweNXlfSm&filter=pe:LAST_12_MONTHS&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard6Widget3Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:h4B7BYeWut1&filter=pe:LAST_12_MONTHS&dimension=ou:W6sNfkJcXGC;YvLOmtTQD6b;XKGgynPS1WZ;rO2RVJWHpCe;FRmrFTE63D0;MBZYTqkEgwf;hdeC7uX9Cko;RdNV4tTRNEo;VWGSudnonm5;quFXhkOJGB4;vBWtCmNNnCG;c4HrGRJoarj;pFCZqWnXtoU;TOgZ99Jv0bN;dOhqCNenSjS;sv6c7CpPcrc;hRQsZhmvqgS;K27JzTKmBKh;IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard6Widget4Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:Gd5efmbROUX.REPORTING_RATE;Gd5efmbROUX.REPORTING_RATE_ON_TIME&filter=pe:LAST_12_MONTHS&dimension=ou:W6sNfkJcXGC;YvLOmtTQD6b;XKGgynPS1WZ;rO2RVJWHpCe;FRmrFTE63D0;MBZYTqkEgwf;hdeC7uX9Cko;RdNV4tTRNEo;VWGSudnonm5;quFXhkOJGB4;vBWtCmNNnCG;c4HrGRJoarj;pFCZqWnXtoU;TOgZ99Jv0bN;dOhqCNenSjS;sv6c7CpPcrc;hRQsZhmvqgS;K27JzTKmBKh;IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      return result.data;
    },
  },
];

module.exports = { apisDashboard6 };

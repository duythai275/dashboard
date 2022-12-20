import moment from "moment";
const apis = [
  {
    route: `/api/orgUnits`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/organisationUnits?paging=false&fields=id,name,displayName,parent,path,ancestors,translations"
      );
      return result.data.organisationUnits.map((ou) => {
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
    route: `/api/orgUnitGeoJson`,
    handler: async (dhis2Apis) => {
      const orgUnitLevelsResult = await dhis2Apis[0].get(`/api/organisationUnitLevels.json?fields=level,displayName`);
      const levelQueryString = orgUnitLevelsResult.data.organisationUnitLevels.map((oul) => "level=" + oul.level);
      const orgUnitGeoJsonResult = await dhis2Apis[0].get(
        `/api/organisationUnits.geojson?${levelQueryString.join("&")}`
      );
      return orgUnitGeoJsonResult.data;
    }
  },
  {
    route: `/api/dataItems`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get("/api/dataElements?paging=false&fields=id,name,formName,translations");
      return result.data.dataElements.map((de) => {
        const foundNameLo = de.translations.find(
          (translation) => translation.property === "NAME" && translation.locale === "lo"
        );
        return {
          id: de.id,
          nameEn: de.name,
          nameLo: foundNameLo ? foundNameLo.value : de.name
        };
      });
    }
  },
  {
    route: `/api/indicators`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get("/api/indicators?paging=false&fields=id,name,translations");
      return result.data.indicators.map((i) => {
        const foundNameLo = i.translations.find(
          (translation) => translation.property === "FORM_NAME" && translation.locale === "lo"
        );
        return {
          id: i.id,
          nameEn: i.name,
          nameLo: foundNameLo ? foundNameLo.value : i.name
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
  },
  {
    route: `/api/getWidget2Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq&dimension=pe:LAST_12_MONTHS&filter=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false"
      );
      const response = {};
      response.data = result.data.rows.map((row) => ({
        pe: row[1],
        item: row[0],
        value: parseInt(row[2])
      }));
      response.pes = result.data.metaData.dimensions.pe;
      return response;
    }
  },
  {
    route: `/api/getWidget3Data`,
    handler: async (dhis2Apis) => {
      const years = [moment().year()];
      for (let i = 1; i <= 4; i++) {
        years.push(moment().year() - i);
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:FSLrz90vXKf;cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq;kyVKK0JcRPJ;sISjKc2LEDg&dimension=pe:${years.join(
          ";"
        )}&filter=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      const response = {};
      response.data = result.data.rows.map((row) => ({
        pe: row[1],
        item: row[0],
        value: parseInt(row[2])
      }));
      response.pes = result.data.metaData.dimensions.pe;
      response.dxs = ["sISjKc2LEDg", "FSLrz90vXKf", "cPcvesqWRtH", "kyVKK0JcRPJ", "cwhEsbBe6Zs", "dJhWRKs0fcq"];
      return response;
    }
  },
  {
    route: `/api/getWidget4Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:dJhWRKs0fcq&dimension=ou:IWp9dQGM0bS;LEVEL-2&filter=pe:LAST_YEAR&displayProperty=NAME&skipData=false&skipMeta=false"
      );
      const response = result.data.rows.map((row) => ({
        ou: row[1],
        value: parseInt(row[2])
      }));
      return response;
    }
  },
  {
    route: `/api/surveyOptionSets`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/optionSets?filter=id:eq:sKdV9uzCd2Z&fields=id,name,options[id,name,code,translations]&paging=false"
      );
      const response = result.data.optionSets;
      return response;
    }
  },
  {
    route: `/api/getDashboard2Widget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/trackedEntityInstances.json?fields=*&program=nOPMZMF91F6&ou=IWp9dQGM0bS&ouMode=DESCENDANTS&skipPaging=true"
      );
      const response = result.data;
      return response;
    }
  }
];
const dhis2ApiConfigs = [
  {
    //development
    baseUrl: "https://hmis.gov.la/hmis",
    clientId: "hmispublicdashboarddev",
    clientSecret: "bfed13089-0720-194f-462c-69827851837",
    refreshToken: "PbWy0kcCL1BEv0lAsuiY9DO_-Q4"
    //production
    //baseUrl:"http://10.201.48.100:8080/hmis",
    //clientId: "hmispublicdashboard",
    //clientSecret: "057de9135-d058-a911-9a07-3dffaf5e44b",
    //refreshToken: "vnyxj3i2c14JllFWnmPKn9t7x0E"
  },
  {
    //development
    baseUrl: "https://dhis2.world/survey",
    clientId: "surveypublicdashboarddev",
    clientSecret: "a03f6bf84-87e8-5da7-eed6-5f821430c75",
    refreshToken: "K08Wt5GPAXwyiTMonjRIkKqMcyw"
    //production
    //baseUrl:"http://10.201.48.100:8080/hmis",
    //clientId: "surveypublicdashboard",
    //clientSecret: "eebc7d604-21d1-3457-bb61-1c6175b442e",
    //refreshToken: "Vaf0oQfWxEuyqatXknkC_W5YSkE"
  }
];

export default { apis, dhis2ApiConfigs };

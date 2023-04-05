require("dotenv").config();
const moment = require("moment");
const {
  VITE_HMIS_BASE_URL,
  VITE_HMIS_USERNAME,
  VITE_HMIS_PASSWORD,
  VITE_SURVEY_BASE_URL,
  VITE_SURVEY_USERNAME,
  VITE_SURVEY_PASSWORD,
} = process.env;

const apis = [
  {
    route: `/api/orgUnits`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/organisationUnits?paging=false&fields=id,name,displayName,parent,path,ancestors,translations,level,organisationUnitGroups"
      );
      return result.data.organisationUnits
        .filter(
          (ou) =>
            ou.ancestors?.[0]?.id === "IWp9dQGM0bS" || ou.id === "IWp9dQGM0bS"
        )
        .map((ou) => {
          const foundNameLo = ou.translations.find(
            (translation) =>
              translation.property === "NAME" && translation.locale === "lo"
          );
          return {
            id: ou.id,
            level: ou.level,
            parent: ou.parent,
            ancestors: ou.ancestors,
            nameEn: ou.name,
            nameLo: foundNameLo ? foundNameLo.value : ou.name,
            oug: ou.organisationUnitGroups,
          };
        });
    },
  },
  {
    route: `/api/orgUnitGeoJson`,
    handler: async (dhis2Apis) => {
      const orgUnitLevelsResult = await dhis2Apis[0].get(
        `/api/organisationUnitLevels.json?fields=level,displayName`
      );
      const levelQueryString =
        orgUnitLevelsResult.data.organisationUnitLevels.map(
          (oul) => "level=" + oul.level
        );
      const orgUnitGeoJsonResult = await dhis2Apis[0].get(
        `/api/organisationUnits.geojson?${levelQueryString.join("&")}`
      );
      return orgUnitGeoJsonResult.data;
    },
  },
  {
    route: `/api/dataItems`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/dataElements?paging=false&fields=id,name,formName,translations"
      );
      return result.data.dataElements.map((de) => {
        const foundNameLo = de.translations.find(
          (translation) =>
            translation.property === "NAME" && translation.locale === "lo"
        );
        return {
          id: de.id,
          nameEn: de.name,
          nameLo: foundNameLo ? foundNameLo.value : de.name,
        };
      });
    },
  },
  {
    route: `/api/indicators`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/indicators?paging=false&fields=id,name,translations"
      );
      return result.data.indicators.map((i) => {
        const foundNameLo = i.translations.find(
          (translation) =>
            translation.property === "FORM_NAME" && translation.locale === "lo"
        );
        return {
          id: i.id,
          nameEn: i.name,
          nameLo: foundNameLo ? foundNameLo.value : i.name,
        };
      });
    },
  },
  {
    route: `/api/getDashboard1Widget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:cXVnVexZM2V.REPORTING_RATE&dimension=ou:FRmrFTE63D0;K27JzTKmBKh;MBZYTqkEgwf;RdNV4tTRNEo;TOgZ99Jv0bN;VWGSudnonm5;W6sNfkJcXGC;XKGgynPS1WZ;YvLOmtTQD6b;c4HrGRJoarj;dOhqCNenSjS;hRQsZhmvqgS;hdeC7uX9Cko;pFCZqWnXtoU;quFXhkOJGB4;rO2RVJWHpCe;sv6c7CpPcrc;vBWtCmNNnCG&filter=pe:LAST_YEAR&includeNumDen=false&skipData=false&skipMeta=false"
      );
      const response = result.data.rows
        .map((row) => ({ ou: row[1], value: parseFloat(row[2]) }))
        .sort((a, b) => b.value - a.value);

      return response;
    },
  },
  {
    route: `/api/getDashboard1Widget4Data`,
    handler: async (dhis2Apis) => {
      const listPe = [];
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      while (true) {
        if (listPe.length === 36) {
          break;
        }
        listPe.push(`${year}${month < 10 ? `0${month}` : month}`);
        if (month === 1) {
          month = 12;
          year -= 1;
        } else {
          month -= 1;
        }
      }
      const result = await dhis2Apis[0].get(
        `/api/analytics.json?dimension=dx:cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq&dimension=pe:${listPe
          .reverse()
          .join(
            ";"
          )}&filter=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false`
      );
      const response = {};
      response.data = result.data.rows.map((row) => ({
        pe: row[1],
        item: row[0],
        value: parseInt(row[2]),
      }));
      response.pes = result.data.metaData.dimensions.pe;
      return response;
    },
  },
  {
    route: `/api/getDashboard1Widget5Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:dJhWRKs0fcq&dimension=ou:IWp9dQGM0bS;LEVEL-2&filter=pe:LAST_YEAR&displayProperty=NAME&skipData=false&skipMeta=false"
      );
      const response = result.data.rows.map((row) => ({
        ou: row[1],
        value: parseInt(row[2]),
      }));
      return response;
    },
  },
  {
    route: `/api/getDashboard1Widget7Data`,
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
        value: parseInt(row[2]),
      }));
      response.pes = result.data.metaData.dimensions.pe;
      response.dxs = [
        "sISjKc2LEDg",
        "FSLrz90vXKf",
        "cPcvesqWRtH",
        "kyVKK0JcRPJ",
        "cwhEsbBe6Zs",
        "dJhWRKs0fcq",
      ];
      return response;
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
    route: `/api/getDashboard1Widget10Data`,
    handler: async (dhis2Apis) => {
      const result = await Promise.all([
        dhis2Apis[0].get(
          "/api/analytics.json?dimension=dx:cTfAP7at6pN&dimension=ou:IWp9dQGM0bS;LEVEL-3&filter=pe:202302&displayProperty=NAME&skipData=false&skipMeta=false"
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
    route: `/api/getDashboard1Widget1234567Data`,
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
        `/api/analytics.json?dimension=dx:FSLrz90vXKf;cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq;kyVKK0JcRPJ;sISjKc2LEDg&dimension=pe:${pes.join(
          ";"
        )}&dimension=ou:IWp9dQGM0bS;LEVEL-2&includeNumDen=false&skipData=false&skipMeta=false`
      );
      const response = {};
      response.data = result.data.rows.map((row) => ({
        pe: row[1],
        item: row[0],
        value: parseInt(row[2]),
      }));
      response.pes = result.data.metaData.dimensions.pe;
      response.dxs = [
        "sISjKc2LEDg",
        "FSLrz90vXKf",
        "cPcvesqWRtH",
        "kyVKK0JcRPJ",
        "cwhEsbBe6Zs",
        "dJhWRKs0fcq",
      ];
      return result.data;
    },
  },
  {
    route: `/api/getDashboard3Widget1Tab1Data`,
    handler: async (dhis2Apis, req) => {
      const { ou, oug, period, year } = req.query;
      const popLiveBirthUrl = `/api/analytics.json?dimension=dx:Nt5y1WYCqv3&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const targetUrl = `/api/analytics.json?dimension=dx:im5n8Blq0Fu&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const dataUrl = `/api/analytics.json?dimension=dx:cPcvesqWRtH&dimension=pe:${period}&dimension=ou:${oug};${ou}`;
      const result = await Promise.all([
        await dhis2Apis[0].get(dataUrl),
        await dhis2Apis[0].get(popLiveBirthUrl),
        await dhis2Apis[0].get(targetUrl),
      ]);
      const getValueIndex = (headers) => {
        return headers.findIndex((header) => header.name === "value");
      };
      const getPeIndex = (headers) => {
        return headers.findIndex((header) => header.name === "pe");
      };
      const getOuIndex = (headers) => {
        return headers.findIndex((header) => header.name === "ou");
      };
      const data = result[0].data.rows.map((row) => ({
        value: row[getValueIndex(result[0].data.headers)],
        pe: row[getPeIndex(result[0].data.headers)],
        ou: row[getOuIndex(result[0].data.headers)],
      }));
      const popLiveBirth = result[1].data.rows.map((row) => ({
        value: row[getValueIndex(result[1].data.headers)],
        pe: row[getPeIndex(result[1].data.headers)],
        ou: row[getOuIndex(result[1].data.headers)],
      }));
      const target = result[2].data.rows.map((row) => ({
        value: row[getValueIndex(result[2].data.headers)],
        pe: row[getPeIndex(result[2].data.headers)],
        ou: row[getOuIndex(result[2].data.headers)],
      }));

      const response = { data, popLiveBirth, target };
      return response;
    },
  },
  {
    route: `/api/getDashboard3Widget1Tab2Data`,
    handler: async (dhis2Apis, req) => {
      const { ou, oug, period, year } = req.query;
      const targetUrl = `/api/analytics.json?dimension=dx:Bw7pFDosAyM&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const dataUrl = `/api/analytics.json?dimension=dx:cwhEsbBe6Zs&dimension=pe:${period}&dimension=ou:${oug};${ou}`;
      const result = await Promise.all([
        await dhis2Apis[0].get(dataUrl),
        await dhis2Apis[0].get(targetUrl),
      ]);
      const getValueIndex = (headers) => {
        return headers.findIndex((header) => header.name === "value");
      };
      const getPeIndex = (headers) => {
        return headers.findIndex((header) => header.name === "pe");
      };
      const getOuIndex = (headers) => {
        return headers.findIndex((header) => header.name === "ou");
      };
      const data = result[0].data.rows.map((row) => ({
        value: row[getValueIndex(result[0].data.headers)],
        pe: row[getPeIndex(result[0].data.headers)],
        ou: row[getOuIndex(result[0].data.headers)],
      }));
      const target = result[1].data.rows.map((row) => ({
        value: row[getValueIndex(result[1].data.headers)],
        pe: row[getPeIndex(result[1].data.headers)],
        ou: row[getOuIndex(result[1].data.headers)],
      }));

      const response = { data, target };
      return response;
    },
  },
  {
    route: `/api/getDashboard3Widget1Tab3Data`,
    handler: async (dhis2Apis, req) => {
      const { ou, oug, period, year } = req.query;
      const targetUrl = `/api/analytics.json?dimension=dx:HNSkSjnFOQK&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const dataUrl = `/api/analytics.json?dimension=dx:dJhWRKs0fcq&dimension=pe:${period}&dimension=ou:${oug};${ou}`;
      const result = await Promise.all([
        await dhis2Apis[0].get(dataUrl),
        await dhis2Apis[0].get(targetUrl),
      ]);
      const getValueIndex = (headers) => {
        return headers.findIndex((header) => header.name === "value");
      };
      const getPeIndex = (headers) => {
        return headers.findIndex((header) => header.name === "pe");
      };
      const getOuIndex = (headers) => {
        return headers.findIndex((header) => header.name === "ou");
      };
      const data = result[0].data.rows.map((row) => ({
        value: row[getValueIndex(result[0].data.headers)],
        pe: row[getPeIndex(result[0].data.headers)],
        ou: row[getOuIndex(result[0].data.headers)],
      }));
      const target = result[1].data.rows.map((row) => ({
        value: row[getValueIndex(result[1].data.headers)],
        pe: row[getPeIndex(result[1].data.headers)],
        ou: row[getOuIndex(result[1].data.headers)],
      }));

      const response = { data, target };
      return response;
    },
  },
  {
    route: `/api/getDashboard3Widget1Tab4Data`,
    handler: async (dhis2Apis, req) => {
      const { ou, oug, period, year } = req.query;
      const targetUrl = `/api/analytics.json?dimension=dx:raZAr1shigS&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const dataUrl = `/api/analytics.json?dimension=dx:QxmjNDdZSSS&dimension=pe:${period}&dimension=ou:${oug};${ou}`;
      const result = await Promise.all([
        await dhis2Apis[0].get(dataUrl),
        await dhis2Apis[0].get(targetUrl),
      ]);
      const getValueIndex = (headers) => {
        return headers.findIndex((header) => header.name === "value");
      };
      const getPeIndex = (headers) => {
        return headers.findIndex((header) => header.name === "pe");
      };
      const getOuIndex = (headers) => {
        return headers.findIndex((header) => header.name === "ou");
      };
      const data = result[0].data.rows.map((row) => ({
        value: row[getValueIndex(result[0].data.headers)],
        pe: row[getPeIndex(result[0].data.headers)],
        ou: row[getOuIndex(result[0].data.headers)],
      }));
      const target = result[1].data.rows.map((row) => ({
        value: row[getValueIndex(result[1].data.headers)],
        pe: row[getPeIndex(result[1].data.headers)],
        ou: row[getOuIndex(result[1].data.headers)],
      }));

      const response = { data, target };
      return response;
    },
  },
  {
    route: `/api/getDashboard3Widget1Tab5Data`,
    handler: async (dhis2Apis, req) => {
      const { ou, oug, period, year } = req.query;
      const targetUrl = `/api/analytics.json?dimension=dx:ORYGPTXqmPg&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const estUrl = `/api/analytics.json?dimension=dx:Nib5DBD8a2a&dimension=ou:${oug};${ou}&filter=pe:${year}`;
      const outReachUrl = `/api/analytics.json?dimension=dx:SkPFKyJsIWJ&dimension=Vr1KAD9cfqH:Zh1inFu0Z2O&dimension=pe:${period}&filter=ou:${ou}`;
      const dataUrl = `/api/analytics.json?dimension=dx:SkPFKyJsIWJ&dimension=pe:${period}&dimension=ou:${oug};${ou}`;
      const result = await Promise.all([
        await dhis2Apis[0].get(dataUrl),
        await dhis2Apis[0].get(targetUrl),
        await dhis2Apis[0].get(estUrl),
        await dhis2Apis[0].get(outReachUrl),
      ]);
      const getValueIndex = (headers) => {
        return headers.findIndex((header) => header.name === "value");
      };
      const getPeIndex = (headers) => {
        return headers.findIndex((header) => header.name === "pe");
      };
      const getOuIndex = (headers) => {
        return headers.findIndex((header) => header.name === "ou");
      };
      const data = result[0].data.rows.map((row) => ({
        value: row[getValueIndex(result[0].data.headers)],
        pe: row[getPeIndex(result[0].data.headers)],
        ou: row[getOuIndex(result[0].data.headers)],
      }));
      const target = result[1].data.rows.map((row) => ({
        value: row[getValueIndex(result[1].data.headers)],
        pe: row[getPeIndex(result[1].data.headers)],
        ou: row[getOuIndex(result[1].data.headers)],
      }));
      const est = result[2].data.rows.map((row) => ({
        value: row[getValueIndex(result[2].data.headers)],
        pe: row[getPeIndex(result[2].data.headers)],
        ou: row[getOuIndex(result[2].data.headers)],
      }));
      const outReach = result[3].data.rows.map((row) => ({
        value: row[getValueIndex(result[3].data.headers)],
        pe: row[getPeIndex(result[3].data.headers)],
        ou: row[getOuIndex(result[3].data.headers)],
      }));

      const response = { data, target, est, outReach };
      return response;
    },
  },
];
const dhis2ApiConfigs = [
  // {
  //   //development
  //   baseUrl: "https://hmis.gov.la/hmis",
  //   // clientId: "hmispublicdashboarddev",
  //   // clientSecret: "bfed13089-0720-194f-462c-69827851837",
  //   // refreshToken: "DZyrPbXtdJPW8eTCMLwhXWLvGXU"
  //   //production
  //   //baseUrl:"http://10.201.48.100:8080/hmis",
  //   clientId: "hmispublicdashboard",
  //   clientSecret: "057de9135-d058-a911-9a07-3dffaf5e44b",
  //   refreshToken: "krikloya8mGrqSWpMuPFEaaS-Dw"
  // },
  // {
  //   //development
  //   baseUrl: "https://dhis2.world/survey",
  //   //clientId: "surveypublicdashboarddev",
  //   //clientSecret: "a03f6bf84-87e8-5da7-eed6-5f821430c75",
  //   //refreshToken: "4WGNayPyTfZn6xLeLohZy3kNVak"
  //   //production
  //   //baseUrl:"http://10.201.48.100:8080/hmis",
  //   clientId: "surveypublicdashboard",
  //   clientSecret: "eebc7d604-21d1-3457-bb61-1c6175b442e",
  //   refreshToken: "L2_1DKZ6o7D4loFVd4javLWOd-Y"
  // },
  {
    type: "basic",
    baseUrl: VITE_HMIS_BASE_URL,
    username: VITE_HMIS_USERNAME,
    password: VITE_HMIS_PASSWORD,
  },
  // {
  //   type: "basic",
  //   baseUrl: VITE_SURVEY_BASE_URL,
  //   username: VITE_SURVEY_USERNAME,
  //   password: VITE_SURVEY_PASSWORD,
  // },
];

module.exports = { apis, dhis2ApiConfigs };

import moment from "moment";
import * as dotenv from "dotenv";
dotenv.config();
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
      return result.data.organisationUnits.map((ou) => {
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
    route: `/api/getWidget1Data`,
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
    route: `/api/getWidget2Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/analytics.json?dimension=dx:cPcvesqWRtH;cwhEsbBe6Zs;dJhWRKs0fcq&dimension=pe:LAST_12_MONTHS&filter=ou:IWp9dQGM0bS&includeNumDen=false&skipData=false&skipMeta=false"
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
    route: `/api/getWidget4Data`,
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
    route: `/api/surveyOptionSets`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/optionSets?filter=id:eq:sKdV9uzCd2Z&fields=id,name,options[id,name,code,translations]&paging=false"
      );
      const response = result.data.optionSets;
      return response;
    },
  },
  {
    route: `/api/getDashboard2Widget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/29/analytics/events/query/nOPMZMF91F6.json?dimension=pe:THIS_YEAR;LAST_5_YEARS&dimension=ou:IWp9dQGM0bS&dimension=es7vEDfcKx8.E3NbdstX2kB&dimension=es7vEDfcKx8.VdRNjfooc04&dimension=es7vEDfcKx8.fU7Nb5KbRto&dimension=es7vEDfcKx8.m8Pu7mzoFoA&dimension=es7vEDfcKx8.q1RUdqYf2D5&dimension=es7vEDfcKx8.GNUM5BQ68pm&dimension=es7vEDfcKx8.X1MIN0lBUQ7&dimension=es7vEDfcKx8.OjS44Bny3WL&dimension=es7vEDfcKx8.Q38v4gRDV9B&dimension=es7vEDfcKx8.kmMdrHxm5st&dimension=es7vEDfcKx8.gyuZihGRKhw&dimension=es7vEDfcKx8.S0KWhgOIFMe&dimension=es7vEDfcKx8.vze0ZB1UePW&dimension=es7vEDfcKx8.gPAM9csPT1l&dimension=es7vEDfcKx8.OO3zfqEsCYk&dimension=es7vEDfcKx8.rFDTPsbpRy4&dimension=es7vEDfcKx8.Ikbtq0Hp2Ct&dimension=es7vEDfcKx8.Ma4Dd0uqxep&dimension=es7vEDfcKx8.vumJG0H4td0&dimension=es7vEDfcKx8.ETsCgWQ1Obj&dimension=es7vEDfcKx8.WWvCIKggfQ2&dimension=es7vEDfcKx8.qZqBTVe9ZRu&dimension=es7vEDfcKx8.rcZq4tp5CPR&dimension=es7vEDfcKx8.jSDNrfCBMV4&dimension=es7vEDfcKx8.HaTqknp8ima&dimension=es7vEDfcKx8.J3H3ebrkuWi&dimension=es7vEDfcKx8.Mci4seBpbFB&dimension=es7vEDfcKx8.uptC4fB4s3l&dimension=es7vEDfcKx8.D23IlrmwvD5&dimension=es7vEDfcKx8.hl1Fe0KUYWY&dimension=es7vEDfcKx8.dYAhnw1uelD&dimension=es7vEDfcKx8.MjjHi9DRtIV&dimension=es7vEDfcKx8.nrirjOFhQ1V&dimension=es7vEDfcKx8.RB7QklJZYbp&dimension=es7vEDfcKx8.RG6UNcO82tR&dimension=es7vEDfcKx8.AhoQN3yIazk&dimension=es7vEDfcKx8.B1I5BI7zJIt&dimension=es7vEDfcKx8.nTWn7ENaptw&dimension=es7vEDfcKx8.U83rvjpDkE6&dimension=es7vEDfcKx8.Uk2GxNsHB5b&dimension=es7vEDfcKx8.L23xsYdvIZZ&dimension=es7vEDfcKx8.CCiO6CEBipb&dimension=es7vEDfcKx8.yVSYkFGGvnL&dimension=es7vEDfcKx8.jNEMy5SpCV5&dimension=es7vEDfcKx8.T7w0YdDLdJe&dimension=es7vEDfcKx8.b6F0tFV9aaA&dimension=es7vEDfcKx8.DabXzGTE7Dt&dimension=es7vEDfcKx8.fH8ftRfVVFo&dimension=es7vEDfcKx8.fbdB7cZVqZz&dimension=es7vEDfcKx8.qFLkTMVMbrr&dimension=es7vEDfcKx8.eyz90WUrIEs&dimension=es7vEDfcKx8.iRNeaALW6Vd&dimension=es7vEDfcKx8.FHpvwRO6aGZ&dimension=es7vEDfcKx8.IZ2E1jWOnpH&dimension=es7vEDfcKx8.mJ1wcecTZt2&dimension=es7vEDfcKx8.IZAELnCx9sU&dimension=es7vEDfcKx8.qE2Sn2DbTuy&dimension=es7vEDfcKx8.erhIWHN6UqE&dimension=es7vEDfcKx8.EIT5SiLyYOv&dimension=es7vEDfcKx8.HIe0Yokig2e&dimension=es7vEDfcKx8.SqXEeUPWhk3&dimension=es7vEDfcKx8.MuQk1FWTbrA&dimension=es7vEDfcKx8.d152hcpyiWM&dimension=es7vEDfcKx8.sTbo8KH3iXO&dimension=es7vEDfcKx8.ptFszDKra2m&dimension=es7vEDfcKx8.TizaKWR5nWU&dimension=es7vEDfcKx8.ukv13o2kCtG&dimension=es7vEDfcKx8.Z6so9Zsul6M&dimension=es7vEDfcKx8.pnzXx5EEYPu&dimension=es7vEDfcKx8.FG4dUbb12eP&dimension=es7vEDfcKx8.bNfkWM4i96t&dimension=es7vEDfcKx8.CEvzGM1yqVD&dimension=es7vEDfcKx8.LBtjIlfEvh4&dimension=es7vEDfcKx8.pISzlYBgZlu&dimension=es7vEDfcKx8.sQcePNan1ED&dimension=es7vEDfcKx8.thoGqq7tYeq&dimension=es7vEDfcKx8.zHGyDzkCrS3&dimension=es7vEDfcKx8.edTLs39yyfY&dimension=es7vEDfcKx8.X7sFhlXR3Zm&dimension=es7vEDfcKx8.oHKgEGkpXjI&dimension=es7vEDfcKx8.sIOeLQFR5Ig&dimension=es7vEDfcKx8.xk69hpxbxed&dimension=es7vEDfcKx8.M9rki73UCR0&dimension=es7vEDfcKx8.oYBWpOaNxTn&dimension=es7vEDfcKx8.RLZ8xxGPxet&dimension=es7vEDfcKx8.gZ4ueVXDgUq&dimension=es7vEDfcKx8.SFKzDq964fa&dimension=es7vEDfcKx8.iZ0OIU91hxl&dimension=es7vEDfcKx8.EmpVahoATNU&dimension=es7vEDfcKx8.mp1mRjJwEa8&dimension=es7vEDfcKx8.ED4mkQRwQ7a&dimension=es7vEDfcKx8.Jeh8r0LG5mD&dimension=es7vEDfcKx8.BkBQ5QhLNlm&dimension=es7vEDfcKx8.r8IXFesfFQ2&dimension=es7vEDfcKx8.GN4pGKduELv&dimension=es7vEDfcKx8.p729D393jsu&dimension=es7vEDfcKx8.tBxUupi4kMb&dimension=es7vEDfcKx8.In7PRC47OtU&dimension=es7vEDfcKx8.cKpZaSvAxzK&dimension=es7vEDfcKx8.V9db007buZE&dimension=es7vEDfcKx8.pEyDXrIVO0b&dimension=es7vEDfcKx8.N55gZ9oPehi&dimension=es7vEDfcKx8.CsjieOOZ9pv&dimension=es7vEDfcKx8.NsOTMYIp3qX&dimension=es7vEDfcKx8.Lazma6Rapgs&dimension=es7vEDfcKx8.mN2mzPmXotd&dimension=es7vEDfcKx8.Bjh8c1UMXTZ&dimension=es7vEDfcKx8.LlmU76ZZ77P&dimension=es7vEDfcKx8.qs7l1gtT608&dimension=es7vEDfcKx8.WZ9PffiEDcO&dimension=es7vEDfcKx8.YKmbwdflzrG&dimension=es7vEDfcKx8.j5zwTrfUJf9&dimension=es7vEDfcKx8.KatN02ohdCd&dimension=es7vEDfcKx8.KVaIZ8B0a1B&stage=es7vEDfcKx8&displayProperty=NAME&pageSize=100000"
      );
      const response = result.data;
      return response;
    },
  },
  {
    route: `/api/getD2W1FilterData`,
    handler: async (dhis2Apis) => {
      const resultCategory = await dhis2Apis[1].get(
        `/api/optionSets/VVvpXcJJq6s.json?fields=options[code,displayFormName]`
      );
      const resultOwnership = await dhis2Apis[1].get(
        `/api/optionSets/agCcJXpPtBM.json?fields=options[code,displayFormName]`
      );
      const resultListDataElementOfService = await dhis2Apis[1].get(
        `/api/programs/nOPMZMF91F6.json?filter=programStages.id:eq:es7vEDfcKx8&fields=programStages[id,name,programStageDataElements[dataElement[id,displayFormName]]]`
      );

      const categories = resultCategory
        ? resultCategory.data.options.map(({ code, displayFormName }) => ({
            code,
            name: displayFormName,
          }))
        : [];

      const ownerships = resultOwnership
        ? resultCategory.data.options.map(({ code, displayFormName }) => ({
            code,
            name: displayFormName,
          }))
        : [];

      const services = resultListDataElementOfService
        ? resultListDataElementOfService.data.programStages[0].programStageDataElements.map(
            ({ dataElement }) => ({
              id: dataElement.id,
              name: dataElement.displayFormName,
            })
          )
        : [];

      return { categories, ownerships, services };
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
  {
    type: "basic",
    baseUrl: VITE_SURVEY_BASE_URL,
    username: VITE_SURVEY_USERNAME,
    password: VITE_SURVEY_PASSWORD,
  },
];

export default { apis, dhis2ApiConfigs };

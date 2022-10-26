import moment from "moment";
const DISEASES = [
  {
    id: "BPlRFHPfdu6",
    name: "Acute Diarrhoea"
  },
  {
    id: "PrgOBbR9fMj",
    name: "Acute Watery Diarrhea (Suspected Cholera)"
  }
];

const generateDashboard1Widget1Url = (disease) => {
  return `/api/analytics.json?dimension=dx:${disease}&dimension=ou:OU_GROUP-khLZ5r8LECn;OU_GROUP-nGvoD40dmsW;OU_GROUP-nghPhW1NSUI;OU_GROUP-sejzgrTy21D;OU_GROUP-xsris5MPojs&dimension=pe:LAST_30_DAYS&displayProperty=NAME&skipData=false`;
};
const generateDashboard1Widget2Url = (disease) => {
  return `/api/analytics.json?dimension=dx:${disease}&dimension=pe:LAST_30_DAYS&filter=ou:OU_GROUP-khLZ5r8LECn;OU_GROUP-nGvoD40dmsW;OU_GROUP-nghPhW1NSUI;OU_GROUP-sejzgrTy21D;OU_GROUP-xsris5MPojs&includeNumDen=false&skipData=false&skipMeta=true`;
};
const generateDashboard1Widget3Urls = (disease) => {
  return [
    `/api/analytics.json?dimension=ou:OU_GROUP-BpBDUtxAnxe&dimension=pe:LAST_14_DAYS&filter=dx:${disease}&showHierarchy=true&includeNumDen=true&skipData=false&skipMeta=true`,
    `/api/analytics.json?dimension=pe:LAST_14_DAYS&dimension=ou:OU_GROUP-BpBDUtxAnxe&filter=dx:${disease}&showHierarchy=true&includeNumDen=true&skipMeta=false&skipData=true&includeMetadataDetails=true`
  ];
};
const generateDashboard1Widget1Api = (url, childrenNo) => {
  return {
    route: `/api/getDashboard1Widget1_${childrenNo}Data`,
    handler: async (dhis2Api) => {
      const result = await dhis2Api.get(url);
      const currentData = {};
      result.data.rows.forEach((row) => {
        const ou = row[1];
        const period = moment(row[2]).format("YYYY-MM-DD");
        const value = parseFloat(row[3]);
        if (currentData[period]) {
          currentData[period][ou] = value;
        } else {
          currentData[period] = {};
          currentData[period][ou] = value;
        }
      });
      return currentData;
    }
  };
};
const generateDashboard1Widget2Api = (url, childrenNo) => {
  return {
    route: `/api/getDashboard1Widget2_${childrenNo}Data`,
    handler: async (dhis2Api) => {
      const result = await dhis2Api.get(url);
      const data = {};
      result.data.rows.forEach((row) => {
        const period = moment(row[1]).format("YYYY-MM-DD");
        const value = parseFloat(row[2]);
        data[period] = value;
      });

      return data;
    }
  };
};
const generateDashboard1Widget3Api = (urls, childrenNo) => {
  return {
    route: `/api/getDashboard1Widget3_${childrenNo}Data`,
    handler: async (dhis2Api) => {
      const dataResult = await dhis2Api.get(urls[0]);
      const metaResult = await dhis2Api.get(urls[1]);
      const data = {
        data: {},
        ous: Object.entries(metaResult.data.metaData.ouNameHierarchy)
          .sort((a, b) => (a[1] <= b[1] ? -1 : 1))
          .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
          }, {})
      };

      dataResult.data.rows.forEach((row) => {
        const ou = metaResult.data.metaData.ouNameHierarchy[row[0]];
        const period = moment(row[1]).format("YYYY-MM-DD");
        const value = parseFloat(row[2]);
        if (data.data[period]) {
          data.data[period][ou] = value;
        } else {
          data.data[period] = {};
          data.data[period][ou] = value;
        }
      });
      return data;
    }
  };
};

const generateDashboard1Apis = () => {
  const apis = [];
  DISEASES.forEach((disease, index) => {
    const widget1Url = generateDashboard1Widget1Url(disease.id);
    const widget2Url = generateDashboard1Widget2Url(disease.id);
    const widget3Urls = generateDashboard1Widget3Urls(disease.id);
    const widget1Api = generateDashboard1Widget1Api(widget1Url, index + 1);
    const widget2Api = generateDashboard1Widget2Api(widget2Url, index + 1);
    const widget3Api = generateDashboard1Widget3Api(widget3Urls, index + 1);
    apis.push(...[widget1Api, widget2Api, widget3Api]);
  });
  return apis;
};
const apis = [...generateDashboard1Apis()];

export default apis;

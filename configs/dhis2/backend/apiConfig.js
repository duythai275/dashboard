import dotenv from "dotenv";

dotenv.config();

const { 
  VITE_HMIS_BASE_URL, 
  VITE_HMIS_USERNAME, 
  VITE_HMIS_PASSWORD 
} = process.env;
const apis = [
    {
        route: `/api/orgUnits`,
        handler: async (dhis2Apis) => {
            const result = await dhis2Apis[0].get(
                "/api/organisationUnits?fields=id,name,displayName,parent,path,ancestors,level&paging=false"
            );
            return result.data;
        }
    },
    {
        route: `/api/singleWeekData`,
        handler: async (dhis2Apis, req) => {
            const { dx, ou, pe } = req.query;
            const dataUrl = `/api/analytics.json?dimension=dx:${dx}&filter=ou:${ou}&filter=pe:${pe}`;
            const result = await dhis2Apis[0].get(dataUrl);
            return { data: result.data };
        }
    },
    {
        route: `/api/last12WeeksData`,
        handler: async (dhis2Apis, req) => {
            const { dx, ou, pe } = req.query;
            const dataUrl = `/api/analytics.json?dimension=dx:${dx}&dimension=pe:${pe}&filter=ou:${ou}`;
            const result = await dhis2Apis[0].get(dataUrl);
            return { data: result.data };
        }
    },
    {
        route: `/api/last12WeeksDataByOus`,
        handler: async (dhis2Apis, req) => {
            const { dx, ou, pe } = req.query;
            const dataUrl = `/api/analytics.json?filter=dx:${dx}&dimension=ou:${ou}&dimension=pe:${pe}`;
            const result = await dhis2Apis[0].get(dataUrl);
            return { data: result.data };
        }
    }
];
const dhis2ApiConfigs = [
    {
        type: "basic",
        baseUrl: VITE_HMIS_BASE_URL,
        username: VITE_HMIS_USERNAME,
        password: VITE_HMIS_PASSWORD
    }
];

export default { apis, dhis2ApiConfigs };
const apisDashboard4 = [
  {
    route: `/api/getDashboard4Widget1Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:zXwbQ7jd7mw&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget2Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:sScwv1UBosT&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget3Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:jgFFGkVRwtj&filter=pe:2019;2018&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget4Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:MLyfF22nQdp&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget5Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:zXwbQ7jd7mw;D8Q6nNeQ7i3;MLyfF22nQdp&filter=pe:2019&dimension=ou:IWp9dQGM0bS;OU_GROUP-jblbYwuvO33&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget6Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:c0wCtjQqaVw;R3wM0nqtpI1;bwpsbj1GJ7y;eQyCWlCP9ci;YvyFbl70Xfn&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget7Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:N3y7HHyv2NN;kTCWlz4hmsU;fMC4kTygUvH;JiZdacMKBeg;HsXo5QqkpIy;j5OHkD5boaV&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget8Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:UdeFCFKWDLF;aIONqyNrC1I;CGdv5LOztzA;CC720JNL6dh;PXOnrm2cRRY&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget9Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:A7dtteJh14B;QAqIL1z0YEk;gBi4nPXoCNw;KcpWxC32Wbg;a1f4jaa8bmL;AYPZJ4vQIdx&filter=pe:2019&filter=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
  {
    route: `/api/getDashboard4Widget10Data`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[1].get(
        "/api/analytics?dimension=dx:RQi2RHVPhG2;eMp8wclN6KX;AOdPWBwjsPh;TX23XbrmVMb;xZt6m4bMvnC;ig4Os43xula;lh4iuoWACCF;OqqTImLT4OR;nIBb7TcAsGa;MoXGkfrL81z;JgBkRQS2w5Y&filter=pe:2019&dimension=ou:IWp9dQGM0bS&includeNumDen=true&skipData=false&skipMeta=false"
      );
      return result.data;
    },
  },
];

module.exports = { apisDashboard4 };

const apisGeneral = [
  {
    route: `/api/orgUnits`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/organisationUnits?paging=false&fields=id,name,displayName,parent,path,ancestors,translations,level,organisationUnitGroups&filter=level:in:[1,2,3]"
      );
      return result.data.organisationUnits
        .filter((ou) => ou.ancestors?.[0]?.id === "IWp9dQGM0bS" || ou.id === "IWp9dQGM0bS")
        .map((ou) => {
          const foundNameLo = ou.translations.find((translation) => translation.property === "NAME" && translation.locale === "lo");
          return {
            id: ou.id,
            level: ou.level,
            parent: ou.parent,
            ancestors: ou.ancestors,
            nameEn: ou.name,
            nameLo: foundNameLo ? foundNameLo.value : ou.name,
            oug: ou.organisationUnitGroups
          };
        });
    }
  },
  {
    route: `/api/orgUnitGeoJson`,
    handler: async (dhis2Apis) => {
      const orgUnitLevelsResult = await dhis2Apis[0].get(`/api/organisationUnitLevels.json?fields=level,displayName`);
      // const levelQueryString =
      //   orgUnitLevelsResult.data.organisationUnitLevels.map(
      //     (oul) => "level=" + oul.level
      //   );

      const levelQueryString = "level=2&level=3";
      // const orgUnitGeoJsonResult = await dhis2Apis[0].get(`/api/organisationUnits.geojson?${levelQueryString.join("&")}`);
      const orgUnitGeoJsonResult = await dhis2Apis[0].get(`/api/organisationUnits.geojson?${levelQueryString}`);

      return orgUnitGeoJsonResult.data;
    }
  },
  {
    route: `/api/dataItems`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/dataElements.json?paging=false&fields=id,name,formName,translations&filter=domainType:eq:AGGREGATE"
      );
      return result.data.dataElements.map((de) => {
        const foundNameLo = de.translations.find((translation) => translation.property === "NAME" && translation.locale === "lo");
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
        const foundNameLo = i.translations.find((translation) => translation.property === "FORM_NAME" && translation.locale === "lo");
        return {
          id: i.id,
          nameEn: i.name,
          nameLo: foundNameLo ? foundNameLo.value : i.name
        };
      });
    }
  }
];

module.exports = { apisGeneral };

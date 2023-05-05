const apisGeneral = [
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
        "/api/indicators.json?paging=false&fields=id,name,translations"
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
    route: `/api/dataSets`,
    handler: async (dhis2Apis) => {
      const result = await dhis2Apis[0].get(
        "/api/dataSets.json?paging=false&fields=id,name,translations"
      );
      return result.data.dataSets.map((i) => {
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
];

module.exports = { apisGeneral };

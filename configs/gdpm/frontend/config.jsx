import useDashboardStore from "@/state/dashboard";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import locales from "./locales";
import { pull } from "@/utils/fetch";
import { useTranslation } from "react-i18next";
import BulletinDashboard from "./dashboards/BulletinDashboard/BulletinDashboard";
import DiseaseDashboard from "./dashboards/DiseaseDashboard";
import _ from "lodash";
const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code
}));

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);
  const setMetadata = useMetadataStore((state) => state.setMetadata);
  const [ready, setReady] = useState(false);

  const { t, i18n } = useTranslation();
  const { initDashboardState, selectDashboard, setDashboards } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard,
      setDashboards: state.setDashboards
    }),
    shallow
  );

  useEffect(() => {
    selectLanguage("vi");
    (async () => {
      const dashboards = [
        {
          name: "bulletin",
          dashboard: <BulletinDashboard title="bulletin" />
        }
      ];
      setReady(false);
      const results = await Promise.all([
        pull("/api/optionSets?filter=id:eq:d5fivOeWHIb&fields=id,name,translations,options[id,name,code,translations"),
        pull(
          "/api/organisationUnitGroups?filter=id:in:[oCFEWHz1vlJ,gqdSIqMZvOG,LgSrUpV7Qmv,Mvfn1MRfn7q,n0F2Tl5rMe4]&fields=id,name,translations,organisationUnits[id,name,code,translations]"
        ),
        pull("/api/organisationUnits?filter=level:eq:4&fields=id,name,ancestors[id,name,level]"),
        pull("/api/organisationUnits.geojson?level=2")
      ]);
      setMetadata("diseases", results[0].optionSets[0].options);
      results[1].organisationUnitGroups.forEach((oug) => {
        oug.organisationUnits = _.sortBy(oug.organisationUnits, "code");
      });
      setMetadata("ouGroups", results[1].organisationUnitGroups);
      setMetadata("communes", results[2].organisationUnits);
      setMetadata("orgUnitGeoJson", results[3]);

      results[0].optionSets[0].options.forEach((option, index) => {
        dashboards.push({
          name: i18n.language === "vi" ? option.translations[0]?.value : option.name,
          dashboard: <DiseaseDashboard disease={option.code} dashboardIndex={index + 1} />
        });
      });
      initDashboardState([
        {
          widgets: [
            {
              selectedChildren: 0
            }
          ]
        },
        ...results[0].optionSets[0].options.map((_) => {
          return {
            widgets: [
              {
                selectedChildren: 0
              },
              {
                selectedChildren: 0
              },
              {
                selectedChildren: 0
              },
              {
                selectedChildren: 0
              },
              {
                selectedChildren: 0
              },
              {
                selectedChildren: 0
              }
            ]
          };
        })
      ]);
      setDashboards(dashboards);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setReady(true);
    })();
  }, []);

  return ready;
};

export { useDashboardInitialization, languages };

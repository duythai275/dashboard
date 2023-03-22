import useDashboardStore from "@/state/dashboard";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import locales from "./locales";
import { pull } from "@/utils/fetch";
import { useTranslation } from "react-i18next";
import Dashboard1 from "./dashboards/Dashboard1";

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

  const { t } = useTranslation();
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
      const dashboards = [{ name: "dashboard1Title", dashboard: <Dashboard1 /> }];
      setReady(false);
      const results = await Promise.all([
        pull("/api/optionSets?filter=id:eq:d5fivOeWHIb&fields=id,name,translations,options[id,name,code,translations"),
        pull(
          "/api/organisationUnitGroups?filter=id:in:[oCFEWHz1vlJ,gqdSIqMZvOG,LgSrUpV7Qmv,Mvfn1MRfn7q,n0F2Tl5rMe4]&fields=id,name,translations,organisationUnits[id,name,code,translations]"
        ),
        pull("/api/organisationUnits?filter=level:eq:4&fields=id,name,ancestors[id,name,level]")
      ]);
      setMetadata("diseases", results[0].options);
      setMetadata("ouGroups", results[0].organisationUnitGroups);
      setMetadata("communes", results[0].organisationUnits);

      initDashboardState([
        {
          widgets: [
            {
              selectedChildren: 0
            }
          ]
        }
      ]);
      setDashboards(dashboards);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setReady(true);
    })();
  }, []);

  return ready;
};

export { useDashboardInitialization, languages };

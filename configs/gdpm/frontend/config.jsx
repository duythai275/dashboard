import useDashboardStore from "@/state/dashboard";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import locales from "./locales";
import { pull } from "@/utils/fetch";
import { useTranslation } from "react-i18next";
import Dashboard1 from "./dashboards/Dashboard1";

const dashboards = [{ name: "dashboard1Title", dashboard: Dashboard1 }];
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
  const { initDashboardState, selectDashboard } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard
    }),
    shallow
  );

  useEffect(() => {
    selectLanguage("en");
    (async () => {
      setReady(false);
      const results = await Promise.all([
        pull("/api/optionSets?filter=id:eq:d5fivOeWHIb&fields=id,name,translations,options[id,name,code,translations"),
        pull("/api/organisationUnitGroups?filter=id:in:[oCFEWHz1vlJ]&fields=id,name,translations,organisationUnits[id,name,code,translations")
      ]);
      console.log(results);
      initDashboardState([
        {
          widgets: [
            {
              selectedChildren: 0
            }
          ]
        }
      ]);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setReady(true);
    })();
  }, []);

  return ready;
};

export { dashboards, useDashboardInitialization, languages };

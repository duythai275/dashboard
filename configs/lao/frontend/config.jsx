import useDashboardStore from "@/state/dashboard";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import Dashboard1 from "./Dashboard1/Dashboard1";
import Dashboard2 from "./Dashboard2/Dashboard2";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { pull } from "./utils";
import locales from "./locales";
import { useTranslation } from "react-i18next";
import Dashboard3 from "./Dashboard3/Dashboard3";

const dashboards = [
  { name: "dashboard1Title", dashboard: Dashboard1 },
  { name: "dashboard2Title", dashboard: Dashboard2 },
  { name: "dashboard3Title", dashboard: Dashboard3 },
];
const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code,
}));

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });

  const setMetadata = useMetadataStore((state) => state.setMetadata);
  const [ready, setReady] = useState(false);
  const { t } = useTranslation();
  const { initDashboardState, selectDashboard } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard,
    }),
    shallow
  );

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);

  useEffect(() => {
    selectLanguage("lo");
    (async () => {
      setReady(false);
      const results = await Promise.all([
        pull("/api/orgUnits"),
        pull("/api/dataItems"),
        pull("/api/indicators"),
        pull("/api/orgUnitGeoJson"),
        pull("/api/surveyOptionSets"),
      ]);
      initDashboardState([
        {
          widgets: [
            {
              selectedChildren: 0,
            },
            {
              selectedChildren: 0,
            },
            {
              selectedChildren: 0,
            },
            {
              selectedChildren: 0,
            },
          ],
        },
        {
          widgets: [
            {
              selectedChildren: 0,
            },
            {
              selectedChildren: 0,
            },
          ],
        },
        {
          widgets: [
            {
              selectedChildren: 0,
            },
            {
              selectedChildren: 0,
            },
          ],
        },
      ]);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setMetadata("hmisOrgUnits", results[0].data);
      setMetadata("hmisDataItems", results[1].data);
      setMetadata("hmisIndicators", results[2].data);
      setMetadata("hmisGeoJson", results[3].data);
      setMetadata("surveyOptionSets", results[4].data);
      setReady(true);
    })();
  }, []);

  return ready;
};

export { dashboards, useDashboardInitialization, languages };

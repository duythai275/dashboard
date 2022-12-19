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

const dashboards = [
  { name: "Maternal And Child Mortality Monitoring", dashboard: Dashboard1 },
  { name: "Facilities Profile", dashboard: Dashboard2 }
];
const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code
}));

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });
  const setMetadata = useMetadataStore((state) => state.setMetadata);
  const [ready, setReady] = useState(false);
  const { initDashboardState, selectDashboard } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard
    }),
    shallow
  );

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);

  useEffect(() => {
    (async () => {
      setReady(false);
      const results = await Promise.all([
        pull("/api/orgUnits"),
        pull("/api/dataItems"),
        pull("/api/indicators"),
        pull("/api/orgUnitGeoJson"),
        pull("/api/surveyOptionSets")
      ]);
      initDashboardState([
        {
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
            }
          ]
        },
        {
          widgets: [
            {
              selectedChildren: 0
            },
            {
              selectedChildren: 0
            }
          ]
        }
      ]);
      selectDashboard({ value: 0, label: dashboards[0].name });
      setMetadata("hmisOrgUnits", results[0].data);
      setMetadata("hmisDataItems", results[1].data);
      setMetadata("hmisIndicators", results[2].data);
      setMetadata("hmisGeoJson", results[3].data);
      setMetadata("surveyOptionSets", results[4].data);
      selectLanguage("lo");
      setReady(true);
    })();
  }, []);

  return ready;
};

export { dashboards, useDashboardInitialization, languages };

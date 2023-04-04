import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";

import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useDashboardStore from "@/state/dashboard";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";

import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";

import locales from "./locales";
import { pull } from "./utils";

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
  const { initDashboardState, selectDashboard, setDashboards } =
    useDashboardStore(
      (state) => ({
        initDashboardState: state.initDashboardState,
        selectDashboard: state.selectDashboard,
        setDashboards: state.setDashboards,
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
      setDashboards(dashboards);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setMetadata("hmisOrgUnits", results[0].data);
      setMetadata("hmisDataItems", results[1].data);
      setMetadata("hmisIndicators", results[2].data);
      setMetadata("hmisGeoJson", results[3].data);
      setReady(true);
    })();
  }, []);
  return ready;
};

export { useDashboardInitialization, languages };

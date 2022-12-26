import { useEffect, useState } from "react";
import Dashboard1 from "./Dashboard1/Dashboard1";
import locales from "./locales";
import useDashboardStore from "@/state/dashboard";
import shallow from "zustand/shallow";
import { useTranslation } from "react-i18next";
import useSelectionStore from "@/state/selection";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useMetadataStore from "@/state/metadata";
import axios from "axios";
const dashboards = [{ name: "dashboard1Title", dashboard: Dashboard1 }];

const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code
}));

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const setMetadata = useMetadataStore((state) => state.setMetadata);
  const { initDashboardState, selectDashboard } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard
    }),
    shallow
  );
  const selectLanguage = useSelectionStore((state) => state.selectLanguage);

  useEffect(() => {
    selectLanguage("vi");

    (async () => {
      const results = await Promise.all([axios.get("/api/getLtUnits")]);
      setMetadata("ltUnits", results[0].data);
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

  //lấy metadata, lấyxong thì set ready = true
  return ready;
};

export {
  dashboards, //xong
  useDashboardInitialization,
  languages
};

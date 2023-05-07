import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useDashboardStore from "@/state/dashboard";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import Dashboard1 from "./Dashboard1";
import Dashboard1_1 from "./Dashboard1_1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import Dashboard4 from "./Dashboard4";
import locales from "./locales";
import { pull } from "./utils";
import { format } from "date-fns";

const dashboards = [
  { name: "dashboard1Title", dashboard: Dashboard1_1 },
  // { name: "M & C (old)", dashboard: Dashboard1 },
  { name: "dashboard2Title", dashboard: Dashboard2 },
  // { name: "dashboard3Title", dashboard: Dashboard3 },
  { name: "dashboard4Title", dashboard: Dashboard4 }
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
  const { t } = useTranslation();
  const { initDashboardState, selectDashboard, setDashboards } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard,
      setDashboards: state.setDashboards
    }),
    shallow
  );

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);

  useEffect(() => {
    selectLanguage("en");
    (async () => {
      setReady(false);
      const results = await Promise.all([
        pull("/api/orgUnits"),
        pull("/api/dataItems"),
        pull("/api/indicators"),
        pull("/api/orgUnitGeoJson"),
        pull("/api/dataSets"),
        pull("/api/fhisIndicators"),
        pull("/api/fhisDataItems"),
        pull("/api/lastUpdated")
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
        },
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
        },
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
            },
            {
              selectedChildren: 0
            }
          ]
        }
      ]);
      setDashboards(dashboards);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
      setMetadata("hmisOrgUnits", results[0].data);
      setMetadata("hmisDataItems", results[1].data);
      setMetadata("hmisIndicators", results[2].data);
      setMetadata("hmisGeoJson", results[3].data);
      setMetadata("hmisDataSets", results[4].data);
      setMetadata("fhisIndicators", results[5].data);
      setMetadata("fhisDataItems", results[6].data);
      setMetadata("lastUpdated", results[7].data.lastUpdated);
      setReady(true);
    })();
  }, []);
  return ready;
};

const CustomControl = () => {
  const { t } = useTranslation();
  const lastUpdated = useMetadataStore((state) => state.lastUpdated);
  return (
    <div
      style={{
        fontWeight: "bold",
        height: 40,
        padding: 8,
        backgroundColor: "#edf7ed",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        color: "#1e4620",
        fontSize: 14
      }}
    >
      <FontAwesomeIcon icon={faCircleCheck} />
      &nbsp;&nbsp;{t("lastUpdated")}: {lastUpdated ? format(new Date(lastUpdated), "yyyy-MM-dd") : "N/A"}
    </div>
  );
};

const customControl = <CustomControl />;

export { useDashboardInitialization, languages, customControl };

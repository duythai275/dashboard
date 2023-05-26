import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import useDashboardStore from "@/state/dashboard";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
// import Dashboard1 from "./Dashboard1";
import Dashboard1_1 from "./Dashboard1_1";
import Dashboard2 from "./Dashboard2";
// import Dashboard3 from "./Dashboard3";
import Dashboard4 from "./Dashboard4";
import Dashboard5 from "./Dashboard5";
import locales from "./locales";
import { pull } from "./utils";
import { format, sub } from "date-fns";
import Dashboard6 from "./Dashboard6";
const gaScript1 = document.createElement("script");
gaScript1.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-E6C7SB4FEP");
const gaScript2 = document.createElement("script");
gaScript2.innerHTML = `
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E6C7SB4FEP');
`;
document.head.appendChild(gaScript1);
document.head.appendChild(gaScript2);

const dashboards = [
  { name: "dashboard4Title", dashboard: Dashboard4 },
  { name: "dashboard5Title", dashboard: Dashboard5 },
  { name: "dashboard2Title", dashboard: Dashboard2 },
  { name: "dashboard6Title", dashboard: Dashboard6 },
  { name: "dashboard1Title", dashboard: Dashboard1_1 },
  {
    name: "dashboard7Title",
    callback: () => {
      window.open("https://hmis.gov.la/doc", "_blank");
    }
  }
];

const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code
}));

// { name: "dashboard2Title", dashboard: Dashboard2 },
// { name: "dashboard4Title", dashboard: Dashboard4 },
// { name: "dashboard1Title", dashboard: Dashboard1_1 },
// { name: "dashboard5Title", dashboard: Dashboard5 },
// { name: "dashboard6Title", dashboard: Dashboard6 },

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });

  const setMetadata = useMetadataStore((state) => state.setMetadata);
  const [ready, setReady] = useState(false);
  const { t } = useTranslation();
  const { initDashboardState, selectDashboard, selectedDashboard, setDashboards } = useDashboardStore(
    (state) => ({
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard,
      setDashboards: state.setDashboards,
      selectedDashboard: state.selectedDashboard
    }),
    shallow
  );

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);

  useEffect(() => {
    gtag("config", "TAG_ID", {
      send_page_view: false
    });
  }, []);

  useEffect(() => {
    if (selectedDashboard && selectedDashboard.label) {
      const currentDashboard = dashboards[selectedDashboard.value];
      const en = t(currentDashboard.name, { lng: "en" });
      gtag("event", "page_view", {
        // app_name: "hispvn_public_dashboard",
        page_title: en,
        page_location: en
      });
    }
  }, [selectedDashboard ? selectedDashboard.value : null]);

  useEffect(() => {
    selectLanguage("lo");
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
        pull("/api/lastUpdated"),
        pull("/api/options")
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
      setMetadata("hmisOptions", results[8].data);
      setReady(true);
    })();
  }, []);
  return ready;
};

const CustomControl = () => {
  const { t } = useTranslation();
  const lastUpdated = useMetadataStore((state) => state.lastUpdated);

  return (
    <div style={{ display: "flex" }}>
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
      &nbsp;&nbsp;
      <div
        style={{
          fontWeight: "bold",
          height: 40,
          padding: 8,
          backgroundColor: "#fff4e5",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          color: "#663c00",
          fontSize: 14
        }}
      >
        <FontAwesomeIcon icon={faCircleInfo} />
        &nbsp;&nbsp;{t("asAt")}: {lastUpdated ? t(format(sub(new Date(lastUpdated), { months: 1 }), "MMM").toLowerCase()) : "N/A"}{" "}
        {format(sub(new Date(lastUpdated), { months: 1 }), "yyyy")} ({t("dataFromDhis2")})
      </div>
    </div>
  );
};

const customControl = <CustomControl />;

export { useDashboardInitialization, languages, customControl };

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
import changeMapWidgetChildren from "./hooks/changeMapWidgetChildren";
import _ from "lodash";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import DengueDashboard from "./dashboards/DengueDashboard";
import OrgUnitSelector from "@/components/OrgUnitSelector/OrgUnitSelector";
import HivDashboard from "./dashboards/HivDashboard/HivDashboard";

const languages = locales.map((locale) => ({
  name: locale.name,
  code: locale.code,
}));

const useDashboardInitialization = () => {
  locales.forEach((locale) => {
    useAdditionalLocale(locale.code, locale.translations);
  });

  const selectLanguage = useSelectionStore((state) => state.selectLanguage);
  const { setMetadata, diseases } = useMetadataStore(
    (state) => ({ diseases: state.diseases, setMetadata: state.setMetadata }),
    shallow
  );
  const [ready, setReady] = useState(false);

  const { t, i18n } = useTranslation();
  const {
    selectedDashboard,
    initDashboardState,
    selectDashboard,
    setDashboards,
  } = useDashboardStore(
    (state) => ({
      selectedDashboard: state.selectedDashboard,
      initDashboardState: state.initDashboardState,
      selectDashboard: state.selectDashboard,
      setDashboards: state.setDashboards,
    }),
    shallow
  );

  useEffect(() => {
    selectLanguage("vi");
    (async () => {
      const dashboards = [
        {
          name: "bulletin",
          dashboard: <BulletinDashboard title="bulletin" />,
        },
        {
          name: "dengue",
          dashboard: <DengueDashboard title="dengue" />,
        },
        {
          name: "hiv",
          dashboard: <HivDashboard title="hiv" />,
        },
      ];
      setReady(false);
      const results = await Promise.all([
        pull(
          "/api/optionSets?filter=id:eq:d5fivOeWHIb&fields=id,name,translations,options[id,name,code,translations"
        ),
        pull(
          "/api/organisationUnits?fields=id,name,displayName,level,parent,ancestors[id,name,level],organisationUnitGroups[id,name]&paging=false"
        ),
        pull("/api/organisationUnits.geojson?level=2&level=3"),
      ]);

      setMetadata("diseases", results[0].optionSets[0].options);
      setMetadata("communes", results[1].organisationUnits);
      setMetadata("orgUnitGeoJson", results[2]);

      // results[0].optionSets[0].options.forEach((option, index) => {
      //   dashboards.push({
      //     name:
      //       i18n.language === "vi"
      //         ? option.translations[0]?.value
      //         : option.name,
      //     dashboard: (
      //       <DiseaseDashboard
      //         disease={option.code}
      //         dashboardIndex={index + 1}
      //       />
      //     ),
      //   });
      // });
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
      selectDashboard({ value: 1, label: t(dashboards[1].name) });
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (diseases) {
      const dashboards = [
        {
          name: "bulletin",
          dashboard: <BulletinDashboard title="bulletin" />,
        },
        {
          name: "dengue",
          dashboard: <DengueDashboard title="dengue" />,
        },
        {
          name: "hiv",
          dashboard: <HivDashboard title="hiv" />,
        },
      ];
      setDashboards(dashboards);
      selectDashboard({
        value: selectedDashboard.value,
        label: t(dashboards[selectedDashboard.value].name),
      });
    }
  }, [i18n.language]);
  changeMapWidgetChildren();
  return ready;
};

const CustomControlForDiseaseBulletin = () => {
  const { t } = useTranslation();
  const { orgUnits } = useMetadataStore(
    (state) => ({ orgUnits: state.communes }),
    shallow
  );
  const { changeAdditionalStateProperty, additionalState, selectedDashboard } =
    useDashboardStore(
      (state) => ({
        changeAdditionalStateProperty: state.changeAdditionalStateProperty,
        additionalState: state.additionalState,
        selectedDashboard: state.selectedDashboard,
      }),
      shallow
    );
  useEffect(() => {
    if (selectedDashboard?.value !== BULLETIN_DASHBOARD_VALUE)
      changeAdditionalStateProperty("selectedDisease", null);
    if (selectedDashboard.value !== DENGUE_DASHBOARD_VALUE) {
      changeAdditionalStateProperty("selectedPeriod", null);
      changeAdditionalStateProperty("selectedOrgUnit", null);
    } else {
      changeAdditionalStateProperty("selectedPeriod", 2023);
      changeAdditionalStateProperty(
        "selectedOrgUnit",
        orgUnits.find((ou) => ou.level === 1)
      );
    }
  }, [selectedDashboard?.value]);

  if (selectedDashboard?.value === DENGUE_DASHBOARD_VALUE) {
    return (
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Autocomplete
          disableClearable={true}
          value={
            additionalState.selectedPeriod ? additionalState.selectedPeriod : ""
          }
          sx={{ width: 200 }}
          options={(() => {
            let currentYear = new Date().getFullYear();
            let result = [];
            while (currentYear >= 2011) {
              result.push(currentYear);
              currentYear--;
            }
            return result;
          })()}
          renderInput={(params) => (
            <TextField {...params} placeholder={t("selectYear")} />
          )}
          onChange={(event, newValue) => {
            if (newValue.callback) {
              newValue.callback();
              return;
            }
            changeAdditionalStateProperty("selectedPeriod", newValue);
          }}
        />
        <OrgUnitSelector
          orgUnits={orgUnits.filter(
            (ou) =>
              !ou.organisationUnitGroups.find((oug) => oug.id === "GFmTbzHbILH")
          )}
          initialOrgUnit={orgUnits.find((ou) => ou.level === 1)}
          accept={(orgUnit) => {
            changeAdditionalStateProperty("selectedOrgUnit", orgUnit);
          }}
        />
      </Box>
    );
  }

  if (selectedDashboard?.value === HIV_DASHBOARD_VALUE) return null;

  return (
    <Button
      disabled={additionalState.selectedDisease ? false : true}
      variant="contained"
      onClick={() => {
        changeAdditionalStateProperty("selectedDisease", null);
      }}
    >
      {t("back")}
    </Button>
  );
};

const customControl = <CustomControlForDiseaseBulletin />;

export { useDashboardInitialization, languages, customControl };

const BULLETIN_DASHBOARD_VALUE = 0;
const DENGUE_DASHBOARD_VALUE = 1;
const HIV_DASHBOARD_VALUE = 2;

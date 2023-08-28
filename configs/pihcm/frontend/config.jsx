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
import InfluenzaDashboard from "./dashboards/InfluenzaDashboard";
import { format, getDay, getMonth, getQuarter, getYear } from "date-fns";
import { MONTHS } from "@/components/PeriodSelector/MonthSelector";
import moment from "moment";
import HfmdDashboard from "./dashboards/HfmdDashboard";
import CaseCovid19Dashboard from "./dashboards/CaseCovid19Dashboard";
import VariantSarsCov2Dashboard from "./dashboards/VariantSarsCov2Dashboard";
import WeekRangeSelector from "./dashboards/VariantSarsCov2Dashboard/Components/WeekRangeSelector";

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
        {
          name: "influenza",
          dashboard: <InfluenzaDashboard title="influenza" />,
        },
        {
          name: "hfmd",
          dashboard: <HfmdDashboard title="hfmd" />,
        },
        {
          name: "variantSarsCov2",
          dashboard: <VariantSarsCov2Dashboard title="variantSarsCov2" />,
        },
        {
          name: "caseCovid19",
          dashboard: <CaseCovid19Dashboard title="caseCovid19" />,
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
        pull(
          "/api/programs/H9DEFEUTxGc?fields=programStages[programStageDataElements[dataElement[id,name,optionSet[options[id,name,code,displayName,style]]]]],organisationUnits[path,children,id,name,displayName,level,parent,ancestors[id,name,level],organisationUnitGroups[id,name]]&paging=false"
        ),
        pull(
          "/api/programs/AczMEDapsFu?fields=organisationUnits[path,children,id,name,displayName,level,parent,ancestors[id,name,level],organisationUnitGroups[id,name]],programStages[programStageDataElements[dataElement[id,name,optionSet[options[id,name,code,displayName,style]]]]]&paging=false"
        ),
        pull(
          "/api/programs/E1Vl6am7tTX?fields=organisationUnits[path,children,id,name,displayName,level,parent,ancestors[id,name,level],organisationUnitGroups[id,name]],programStages[programStageDataElements[dataElement[id,name,optionSet[options[id,name,code,displayName,style]]]]]&paging=false"
        ),
      ]);

      setMetadata("diseases", results[0].optionSets[0].options);
      setMetadata("communes", results[1].organisationUnits);
      setMetadata("orgUnitGeoJson", results[2]);
      setMetadata("orgUnitInfluenza", results[3].organisationUnits);
      setMetadata(
        "optionsInfluenza",
        results[3].programStages[0].programStageDataElements.find(
          (item) => item.dataElement.id === "LPXRRN8Uvnj"
        )
      );
      setMetadata("orgUnitsHfmd", results[4].organisationUnits);
      setMetadata(
        "dataElementsHfmd",
        results[4].programStages[0].programStageDataElements.map(
          (item) => item.dataElement
        )
      );
      setMetadata(
        "dataElementsVariantSarsCov2",
        results[5].programStages[0].programStageDataElements.map(
          (item) => item.dataElement
        )
      );

      const orgUnitInfluenzaColors = [];

      for (let i = 0; i <= results[3].organisationUnits.length; i++) {
        const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        orgUnitInfluenzaColors.push(randomColor);
      }

      const optionsInfluenzaColors = [];

      for (
        let i = 0;
        i <
        results[3].programStages[0].programStageDataElements.find(
          (item) => item.dataElement.id === "LPXRRN8Uvnj"
        ).dataElement.optionSet.options.length;
        i++
      ) {
        const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        optionsInfluenzaColors.push(randomColor);
      }

      setMetadata("orgUnitInfluenzaColors", orgUnitInfluenzaColors);
      setMetadata("optionsInfluenzaColors", optionsInfluenzaColors);

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
        {
          widgets: [],
        },
      ]);
      setDashboards(dashboards);
      selectDashboard({ value: 0, label: t(dashboards[0].name) });
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
        {
          name: "influenza",
          dashboard: <InfluenzaDashboard title="influenza" />,
        },
        {
          name: "hfmd",
          dashboard: <HfmdDashboard title="hfmd" />,
        },
        {
          name: "variantSarsCov2",
          dashboard: <VariantSarsCov2Dashboard title="variantSarsCov2" />,
        },
        {
          name: "caseCovid19",
          dashboard: <CaseCovid19Dashboard title="caseCovid19" />,
        },
      ];
      setDashboards(dashboards);
      selectDashboard({
        value: selectedDashboard.value,
        label: t(dashboards[selectedDashboard.value].name),
      });
    }
  }, [i18n.language]);

  if (selectDashboard.value !== "3" && selectDashboard.value) {
    changeMapWidgetChildren();
  }
  return ready;
};

const CustomControlForDiseaseBulletin = () => {
  const { t } = useTranslation();
  const { orgUnits, orgUnitInfluenza, orgUnitsHfmd } = useMetadataStore(
    (state) => ({
      orgUnits: state.communes,
      orgUnitInfluenza: state.orgUnitInfluenza,
      orgUnitsHfmd: state.orgUnitsHfmd,
    }),
    shallow
  );
  const {
    changeAdditionalStateProperty,
    additionalState,
    selectedDashboard,
    resetAdditionalState,
  } = useDashboardStore(
    (state) => ({
      changeAdditionalStateProperty: state.changeAdditionalStateProperty,
      additionalState: state.additionalState,
      selectedDashboard: state.selectedDashboard,
      resetAdditionalState: state.resetAdditionalState,
    }),
    shallow
  );
  const convertToDhis2Period = (period, periodType) => {
    let startDate;
    let endDate;
    switch (periodType) {
      case "Yearly":
        if (period.year) {
          return {
            ...period,
            dhis2Period: `${period.year}`,
            startDate: `${period.year}-01-01`,
            endDate: `${period.year}-12-31`,
            periodName: period.year,
          };
        } else {
          return {
            ...period,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            periodName: "",
          };
        }
      case "Monthly":
        if (period.year && period.month) {
          startDate = moment([period.year, period.month - 1])
            .startOf("month")
            .format("YYYY-MM-DD");
          endDate = moment([period.year, period.month - 1])
            .endOf("month")
            .format("YYYY-MM-DD");
          return {
            ...period,
            dhis2Period: `${period.year}${
              period.month < 10 ? "0" + period.month : period.month
            }`,
            startDate: startDate,
            endDate: endDate,
            monthName: t(MONTHS[period.month - 1]),
            periodName: period.monthName + " " + period.year,
          };
        } else {
          return {
            ...period,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            monthName: "",
            periodName: "",
          };
        }
      case "Quarterly":
        if (period.year && period.quarter) {
          startDate = moment([period.year])
            .quarter(period.quarter)
            .startOf("quarter")
            .format("YYYY-MM-DD");
          endDate = moment([period.year])
            .quarter(period.quarter)
            .endOf("quarter")
            .format("YYYY-MM-DD");
          return {
            ...period,
            dhis2Period: `${period.year}Q${period.quarter}`,
            startDate,
            endDate,
            quarterName: t("Q" + period.quarter),
            periodName: period.quarterName + " - " + period.year,
          };
        } else {
          return {
            ...period,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            quarterName: "",
            periodName: "",
          };
        }
      case "Weekly":
        if (period.year && period.week) {
          startDate = moment([period.year, 1, 1])
            .isoWeek(period.week)
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          endDate = moment([period.year, 1, 1])
            .isoWeek(period.week)
            .endOf("isoWeek")
            .format("YYYY-MM-DD");
          return {
            ...period,
            dhis2Period: `${period.year}W${period.week}`,
            startDate,
            endDate,
            weekName: t("week") + " " + period.week,
            periodName: period.weekName + " - " + period.year,
          };
        } else {
          return {
            ...period,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            weekName,
            periodName: "",
          };
        }
      case "Daily":
        if (period.date) {
          return {
            ...period,
            dhis2Period: `${period.date.replace(/-/g, "")}`,
            startDate: period.date,
            endDate: period.date,
            periodName: period.date,
          };
        } else {
          return {
            ...period,
            dhis2Period: null,
            startDate: "",
            endDate: "",
            periodName: "",
          };
        }
      default:
        return {
          ...period,
          dhis2Period: null,
          startDate: "",
          endDate: "",
          periodName: "",
        };
    }
  };

  const [periodHfmd, setPeriodHfmd] = useState(
    additionalState.selectedPeriod || []
  );
  const [periodHfmdFocus, setPeriodHfmdFocus] = useState(false);

  useEffect(() => {
    resetAdditionalState([
      "period",
      "selectedOrgUnit",
      "selectedOrgUnitInfluenza",
      "grandTotalName",
      "selectedDisease",
      "periodForW1",
      "periodForW2",
      "periodForW3",
      "periodForW4",
    ]);
    switch (selectedDashboard?.value) {
      case DENGUE_DASHBOARD_VALUE:
        changeAdditionalStateProperty("selectedPeriod", 2023);
        changeAdditionalStateProperty(
          "selectedOrgUnit",
          orgUnits.find((ou) => ou.level === 1)
        );
        break;
      case INFLUENZA_DASHBOARD_VALUE:
        changeAdditionalStateProperty("selectedPeriod", 2023);
        changeAdditionalStateProperty(
          "selectedOrgUnitInfluenza",
          orgUnitInfluenza.length > 0
            ? orgUnits.find((ou) => ou.level === 1)
            : null
        );
        const findRoot = orgUnits.find((e) => e.id === "Vp8x14BDil5");
        changeAdditionalStateProperty(
          "grandTotalName",
          findRoot ? findRoot.displayName : "Grand Total"
        );
        break;
      case HFMD_DASHBOARD_VALUE:
        setPeriodHfmd([2023]);
        changeAdditionalStateProperty("selectedPeriod", [2023]);
        changeAdditionalStateProperty(
          "selectedOrgUnitForHfmdDashboard",
          orgUnits.length ? orgUnits.find((ou) => ou.level === 1) : null
        );
        break;
      case VARIANT_SARS_COV_2_DASHBOARD_VALUE:
        changeAdditionalStateProperty(
          "selectedPeriodForVariantSarsCov2Dashboard",
          {
            start: {
              year: moment().year(),
              week: 1,
              weekName: t("week") + " " + 1,
            },
            end: {
              year: moment().year(),
              week: moment().week(),
              weekName: t("week") + " " + moment().week(),
            },
          }
        );
        changeAdditionalStateProperty(
          "selectedOrgUnitForVariantSarsCov2Dashboard",
          orgUnits.length ? orgUnits.find((ou) => ou.level === 1) : null
        );

        break;
      case HIV_DASHBOARD_VALUE:
        changeAdditionalStateProperty(
          "periodForW1",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
              month: getMonth(new Date()) + 1,
            },
            "Monthly"
          )
        );
        changeAdditionalStateProperty(
          "periodForW2",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
            },
            "Yearly"
          )
        );
        changeAdditionalStateProperty(
          "periodForW3",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
              quarter: getQuarter(new Date()),
            },
            "Quarterly"
          )
        );
        changeAdditionalStateProperty(
          "periodForW4",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
            },
            "Yearly"
          )
        );
        break;
      case CASE_COVID19_DASHBOARD_VALUE:
        changeAdditionalStateProperty("caseCovid19W1Period", {
          startDate: `${getYear(new Date())}-01-01`,
          endDate: format(new Date(), "yyyy-MM-dd"),
        });
        changeAdditionalStateProperty(
          "caseCovid19W2Period",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
            },
            "Yearly"
          )
        );
        changeAdditionalStateProperty(
          "caseCovid19W3Period",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
            },
            "Yearly"
          )
        );
        changeAdditionalStateProperty(
          "caseCovid19W4Period",
          convertToDhis2Period(
            {
              year: getYear(new Date()),
            },
            "Yearly"
          )
        );
        break;
      default:
        break;
    }
    // if (selectedDashboard?.value !== BULLETIN_DASHBOARD_VALUE)
    //   changeAdditionalStateProperty("selectedDisease", null);
    // if (selectedDashboard.value !== DENGUE_DASHBOARD_VALUE) {
    //   changeAdditionalStateProperty("period", null);
    //   changeAdditionalStateProperty("selectedOrgUnit", null);
    // } else {
    //   changeAdditionalStateProperty("period", 2023);
    //   changeAdditionalStateProperty(
    //     "selectedOrgUnit",
    //     orgUnits.find((ou) => ou.level === 1)
    //   );
    // }
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

  if (selectedDashboard?.value === INFLUENZA_DASHBOARD_VALUE) {
    const stringifiedAssignedOrgUnits = orgUnitInfluenza
      .map((aou) => aou.path)
      .join(";");
    const filtered = orgUnits.filter((ou) => {
      return stringifiedAssignedOrgUnits.includes(ou.id);
    });

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
          orgUnits={filtered}
          initialOrgUnit={orgUnits.find((ou) => ou.level === 1)}
          accept={(orgUnit) => {
            changeAdditionalStateProperty("selectedOrgUnitInfluenza", orgUnit);
          }}
        />
      </Box>
    );
  }

  if (
    selectedDashboard?.value === HIV_DASHBOARD_VALUE ||
    selectedDashboard?.value === CASE_COVID19_DASHBOARD_VALUE
  ) {
    return null;
  }
  if (selectedDashboard?.value === HFMD_DASHBOARD_VALUE) {
    const stringifiedAssignedOrgUnits = orgUnitsHfmd
      .map((aou) => aou.path)
      .join(";");
    const filtered = orgUnits.filter((ou) => {
      return stringifiedAssignedOrgUnits.includes(ou.id);
    });
    return (
      <Box sx={{ alignSelf: "flex-start", display: "flex", gap: "10px" }}>
        <OrgUnitSelector
          orgUnits={filtered}
          initialOrgUnit={filtered.find((ou) => ou.level === 1)}
          accept={(orgUnit) => {
            changeAdditionalStateProperty(
              "selectedOrgUnitForHfmdDashboard",
              orgUnit
            );
          }}
        />
        <Autocomplete
          multiple
          disableClearable={true}
          value={
            periodHfmd
              ? typeof periodHfmd !== "object"
                ? [periodHfmd]
                : periodHfmd
              : []
          }
          getOptionDisabled={(option) =>
            (periodHfmd &&
              periodHfmd.length === 5 &&
              !periodHfmd.includes(option)) ||
            (periodHfmd.length === 1 && periodHfmd.includes(option))
          }
          ChipProps={{
            disabled: periodHfmd.length === 1 ? true : false,
          }}
          limitTags={3}
          sx={{
            width: 400,
            "& .MuiInputBase-root": {
              minHeight: "40px",
              paddingY: "3px !important",
            },
            "& .MuiButtonBase-root": {
              height: "unset !important",
            },
          }}
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
          onOpen={() => {
            setPeriodHfmdFocus(true);
          }}
          onChange={(event, newValue) => {
            if (newValue.callback) {
              newValue.callback();
              return;
            }
            if (!periodHfmdFocus) {
              changeAdditionalStateProperty("selectedPeriod", newValue);
            }
            setPeriodHfmd(newValue);
          }}
          onClose={() => {
            changeAdditionalStateProperty("selectedPeriod", periodHfmd);
            setPeriodHfmdFocus(false);
          }}
          on
          disableCloseOnSelect
        />
      </Box>
    );
  }
  if (selectedDashboard?.value === VARIANT_SARS_COV_2_DASHBOARD_VALUE) {
    return (
      <Box sx={{ display: "flex", gap: "10px" }}>
        <OrgUnitSelector
          orgUnits={orgUnits.filter((ou) => ou.level === 1 || ou.level === 2)}
          initialOrgUnit={orgUnits.find((ou) => ou.level === 1)}
          accept={(orgUnit) => {
            changeAdditionalStateProperty(
              "selectedOrgUnitForVariantSarsCov2Dashboard",
              orgUnit
            );
          }}
        />
        <WeekRangeSelector initValue="selectedPeriodForVariantSarsCov2Dashboard" />
      </Box>
    );
  }

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
const INFLUENZA_DASHBOARD_VALUE = 3;
const HFMD_DASHBOARD_VALUE = 4;
const VARIANT_SARS_COV_2_DASHBOARD_VALUE = 5;
const CASE_COVID19_DASHBOARD_VALUE = 6;

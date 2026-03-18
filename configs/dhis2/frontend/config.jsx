import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import useDashboardStore from "@/state/dashboard";
import useSelectionStore from "@/state/selection";
import useMetadataStore from "@/state/metadata";
// import useAdditionalLocale from "@/hooks/App/useAdditionalLocale";
import { Box, Autocomplete, TextField, Popover, Button } from "@mui/material";
import OrgUnitSelector from "@/components/OrgUnitSelector/OrgUnitSelector";
import YearSelector from "@/components/PeriodSelector/YearSelector";
import WeekSelector from "@/components/PeriodSelector/WeekSelector";
import Dashboard1 from "./Dashboard1/Dashboard1";
import Dashboard2 from "./Dashboard2/Dashboard2";
import Dashboard3 from "./Dashboard3/Dashboard3";
import axios from "axios";
import { getWeekNumber } from "./utils";

const useDashboardInitialization = () => {
    const [ready, setReady] = useState(false);

    const { setMetadata } = useMetadataStore(
        (state) => ({ 
            setMetadata: state.setMetadata 
        }),
        shallow
    );
    const { selectLanguage, selectOrgUnit, selectPeriod } = useSelectionStore(
        (state) => ({
            selectLanguage: state.selectLanguage,
            selectOrgUnit: state.selectOrgUnit,
            selectPeriod: state.selectPeriod
        }),
        shallow
    );
    const { initDashboardState, selectDashboard, setDashboards } = useDashboardStore(
        (state) => ({
            initDashboardState: state.initDashboardState,
            selectDashboard: state.selectDashboard,
            setDashboards: state.setDashboards
        }),
        shallow
    );

    useEffect(() => {
        selectLanguage("en");
        (async () => {
            const currentYear = new Date().getFullYear();
            const currentWeek = getWeekNumber();
            const results = await Promise.all([
                axios.get("/api/orgUnits")
            ]);
            setMetadata("orgUnits", results[0].data.organisationUnits);
            selectOrgUnit(results[0].data.organisationUnits.find((ou) => ou.level === 1));

            selectPeriod({ 
                id: `${currentYear}W${String(currentWeek).padStart(2, "0")}`, 
                name: `Week ${currentWeek}, ${currentYear}`,
                year: currentYear,
                week: currentWeek
            });
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
                        }
                    ]
                }
            ]);
            setDashboards([
                { name: "Cholera", dashboard: <Dashboard1 /> },
                { name: "Ebola", dashboard: <Dashboard2 /> },
                { name: "MPOX", dashboard: <Dashboard3 /> },
            ]);
            selectDashboard({ value: 0, label: "Cholera" });
            setReady(true);
        })();
    }, []);

    return ready;
}

const CustomControl = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const { orgUnits } = useMetadataStore(
        (state) => ({ 
            orgUnits: state.orgUnits 
        }),
        shallow
    );
    const { period, selectOrgUnit, selectPeriod } = useSelectionStore(
        (state) => ({
            period: state.period,
            selectOrgUnit: state.selectOrgUnit,
            selectPeriod: state.selectPeriod
        }),
        shallow
    );

    useEffect(() => {
        setSelectedYear(period?.year || null);
        setSelectedWeek(period?.week || null);
    }, [
        anchorEl
    ]);
    return <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <OrgUnitSelector
            orgUnits={orgUnits}
            initialOrgUnit={orgUnits.find((ou) => ou.level === 1)}
            accept={(ou) => {
                selectOrgUnit(ou);
            }}
        />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
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
                    fontSize: 14,
                    cursor: "pointer"
                }}
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
            >
                {
                    period ? `Selected Period: ${period.name}` : "Select Period"
                }
            </div>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <div
                    style={{
                        padding: "10px",
                        display: "flex", 
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <YearSelector
                        period={{year: selectedYear}}
                        change={(value) => {
                            setSelectedYear(value);
                        }}
                    />
                    <WeekSelector
                        period={{week: selectedWeek, year: selectedYear}}
                        change={(value) => {
                            setSelectedWeek(value);
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            setAnchorEl(null);
                            if (selectedYear && selectedWeek) {
                                const periodId = `${selectedYear}W${String(selectedWeek).padStart(2, "0")}`;
                                const periodName = `Week ${selectedWeek}, ${selectedYear}`;
                                selectPeriod({
                                    id: periodId,
                                    name: periodName,
                                    year: selectedYear,
                                    week: selectedWeek
                                });
                            }
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </Popover>
        </Box>
    </Box>;
}

const languages = [{
    code: "en",
    name: "English",
    translations: []
}];
const customControl = <CustomControl />;

export {
    useDashboardInitialization,
    languages,
    customControl
}
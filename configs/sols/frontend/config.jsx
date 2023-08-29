import useDashboardStore  from "@/state/dashboard";
import useMetadataStore from "@/state/metadata";
import useSelectionStore from "@/state/selection";
import { pull } from "@/utils/fetch";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

import Dashboard1 from "./dashboards/Dashboard1/Dashboard1";
import Dashboard2 from "./dashboards/Dashboard2/Dashboard2";

const useDashboardInitialization = () => {
    const [ready, setReady] = useState(false);

    const { setMetadata } = useMetadataStore(
        (state) => ({ setMetadata: state.setMetadata }),
        shallow
      );
    const selectLanguage = useSelectionStore((state) => state.selectLanguage);
    const {
        initDashboardState,
        selectDashboard,
        setDashboards,
        changeAdditionalStateProperty
    } = useDashboardStore(
        (state) => ({
            initDashboardState: state.initDashboardState,
            selectDashboard: state.selectDashboard,
            setDashboards: state.setDashboards,
            changeAdditionalStateProperty: state.changeAdditionalStateProperty
        }),
        shallow
    );

    useEffect(() => {
        selectLanguage("en");
        ( async () => {
            const results = await Promise.all([
                pull("/api/organisationUnits.geojson?level=2&level=3")
            ]);
            setMetadata("orgUnitGeoJson", results[0]);
            changeAdditionalStateProperty("periodForW1","");
            initDashboardState([
                {
                    widgets: [{
                        selectedChildren: 0
                    },
                    {
                        selectedChildren: 0
                    }]
                },
                {
                    widgets: [{
                        selectedChildren: 0
                    }]
                }
            ]);
            setDashboards(
                [{
                    name: "Dashboard 1",
                    dashboard: <Dashboard1 />
                },
                {
                    name: "Dashboard 2",
                    dashboard: <Dashboard2 />
                }]
            );
            selectDashboard({ value: 0, label: "Dashboard 1" });
            setReady(true);            
        } )();
    }, []);

    return ready;
}

const languages = [{
    code: "en",
    name: "English",
    translations: []
}];

const CustomControl = () => {
    const {
        selectedDashboard
      } = useDashboardStore(
        (state) => ({
          selectedDashboard: state.selectedDashboard
        }),
        shallow
      );
    return selectedDashboard?.value === 1 ? 
    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Autocomplete
          disableClearable={true}
          value={""}
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
            <TextField {...params} placeholder={"Select Year"} />
          )}
        />
    </Box>
    :
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
            }}
        >
            Last Updated Date: 2023-08-30
        </div>
    </Box>;
}
const customControl = <CustomControl />;

export { useDashboardInitialization, languages, customControl }
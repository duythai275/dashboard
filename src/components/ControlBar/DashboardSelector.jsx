import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { dashboards } from "@/config/config";
import useDashboardStore from "@/state/dashboard";
import shallow from "zustand/shallow";

const DashboardSelector = () => {
  const { t } = useTranslation();
  const { selectedDashboard, selectDashboard } = useDashboardStore(
    (state) => ({
      selectedDashboard: state.selectedDashboard,
      selectDashboard: state.selectDashboard
    }),
    shallow
  );

  return (
    <Autocomplete
      disableClearable={true}
      value={selectedDashboard ? selectedDashboard.label : ""}
      sx={{ width: 400 }}
      options={dashboards.map((d, index) => ({
        value: index,
        label: t(d.name)
      }))}
      renderInput={(params) => <TextField {...params} />}
      onChange={(event, newValue) => {
        selectDashboard(newValue);
      }}
    />
  );
};
export default DashboardSelector;

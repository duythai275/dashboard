import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";

const DashboardSelector = () => {
  const { t } = useTranslation();
  const {
    selectedDashboard,
    selectDashboard,
    dashboards,
    resetAdditionalState,
  } = useDashboardStore(
    (state) => ({
      selectedDashboard: state.selectedDashboard,
      selectDashboard: state.selectDashboard,
      dashboards: state.dashboards,
      resetAdditionalState: state.resetAdditionalState,
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
        label: t(d.name),
        callback: d.callback,
      }))}
      renderInput={(params) => <TextField {...params} />}
      onChange={(event, newValue) => {
        if (newValue.callback) {
          newValue.callback();
          return;
        }
        // resetAdditionalState();
        selectDashboard(newValue);
      }}
    />
  );
};
export default DashboardSelector;

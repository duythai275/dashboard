import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import DateInput from "./DateInput";
import useDashboardStore from "@/state/dashboard";
import { shallow } from "zustand/shallow";

const DateRangeInput = ({ onChange, additionalStateKey }) => {
  const { t } = useTranslation();

  const defaultValue = useDashboardStore(
    (state) => state.additionalState[additionalStateKey],
    shallow
  );
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <DateInput
          value={value.startDate}
          accept={(newValue) => {
            setValue((prev) => ({ ...prev, startDate: newValue }));
          }}
        />
        -
        <DateInput
          value={value.endDate}
          accept={(newValue) => {
            setValue((prev) => ({ ...prev, endDate: newValue }));
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1, pt: 0 }}>
        <Button variant="contained" onClick={() => onChange(value)}>
          {t("apply")}
        </Button>
      </Box>
    </div>
  );
};

export default DateRangeInput;

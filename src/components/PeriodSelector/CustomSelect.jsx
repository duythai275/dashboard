import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomSelect = ({ value, change, valueSet, valueType, label }) => {
  const selected = valueSet.find((item) => item.value === value);
  return (
    <Autocomplete
      disableClearable={true}
      value={selected || null}
      sx={{ width: 200 }}
      options={valueSet}
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onChange={(event, newValue) => {
        change(newValue.value);
      }}
      isOptionEqualToValue={(option, value) => {
        return value ? option.value === value.value : false;
      }}
    />
  );
};

export default CustomSelect;

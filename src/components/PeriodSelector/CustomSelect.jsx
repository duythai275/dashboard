import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomSelect = ({ value, change, valueSet, valueType, label }) => {
  return (
    <Autocomplete
      disableClearable={true}
      value={value}
      sx={{ width: 200 }}
      options={valueSet}
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onChange={(event, newValue) => {
        change(newValue.value);
      }}
    />
  );
};

export default CustomSelect;

import React from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import "./text-input.css";

const TextInput = ({
  label,
  value,
  valueSet,
  change,
  disabled,
  renderOption,
  focus,
  blur,
  tabIndex,
  disableClearable,
  placeholder,
}) => {
  valueSet = valueSet ? valueSet.filter((set) => !set.hidden) : null;

  const generateField = () => {
    if (valueSet) {
      const selected = valueSet.find((vs) => vs.value === value);

      return (
        <Autocomplete
          disableClearable={disableClearable}
          renderOption={renderOption}
          value={selected ? selected : null}
          disabled={disabled}
          onChange={(event, value) => {
            change(value ? value.value : "");
          }}
          isOptionEqualToValue={(option, value) => {
            return value ? option.value === value.value : false;
          }}
          size="small"
          fullWidth
          autoComplete={false}
          options={valueSet}
          renderInput={(params) => <TextField {...params} />}
          placeholder={placeholder}
        />
      );
    }

    return (
      <TextField
        onFocus={focus}
        onBlur={blur}
        size="small"
        fullWidth
        disabled={disabled}
        value={value}
        onChange={(event) => {
          change(event.target.value);
        }}
        InputProps={{ inputProps: { tabIndex } }}
        placeholder={placeholder}
      />
    );
  };

  return (
    <>
      {label && [
        <Typography variant="inputFieldLabel">{label}</Typography>,
        <div style={{ height: 3 }}></div>,
      ]}

      {generateField()}
    </>
  );
};

export default TextInput;

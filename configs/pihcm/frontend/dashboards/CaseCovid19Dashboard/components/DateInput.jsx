import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, Popover } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import enLocale from "date-fns/locale/en-US";
import moment from "moment";
import "react-day-picker/dist/style.css";
import "./DateInput.css";
const { VITE_DATE_FORMAT } = import.meta.env;

const currentYear = new Date().getFullYear();
const localeMap = {
  vi: viLocale,
  en: enLocale,
};

const DateInput = ({
  accept,
  value,
  maxDate,
  minDate,
  disabled,
  focus,
  blur,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const locale = i18n.language;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        onClick={(event) => {
          !disabled && setAnchorEl(event.currentTarget);
        }}
        sx={{ width: 200 }}
        onFocus={focus}
        onBlur={blur}
        size="small"
        fullWidth
        disabled={disabled}
        value={
          value
            ? VITE_DATE_FORMAT
              ? moment(value).format(VITE_DATE_FORMAT)
              : value
            : ""
        }
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <DayPicker
            locale={localeMap[locale]}
            selected={value ? new Date(value) : null}
            mode="single"
            disabled={[
              { after: maxDate ? new Date(maxDate) : null },
              { before: minDate ? new Date(minDate) : null },
            ]}
            fromYear={2019}
            toYear={currentYear}
            captionLayout="dropdown"
            onSelect={(value) => {
              accept(value ? format(value, "yyyy-MM-dd") : "");
              handleClose();
            }}
          />
          <div style={{ padding: 5 }}>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              {t("close")}
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default DateInput;

import { useEffect, useState } from "react";
import { Popover } from "@mui/material";
import moment from "moment";

import MonthPopover from "./MonthPopover";
import TextInput from "../TextInput/TextInput";

import "./month-selector.css";
import { monthsToQuarters } from "date-fns";
import { useTranslation } from "react-i18next";
import { months } from "../../constants";
import _ from "lodash";

const MonthSelector = ({ disabled, onPeriodChange }) => {
  const { t, i18n } = useTranslation();

  const [period, setPeriod] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const renderInputValue = () => {
    let value = "";
    if (period.year && period.month)
      value = period.monthName + " - " + period.year;

    return (
      <TextInput
        disabled={disabled}
        valueType="TEXT"
        value={value}
        placeholder={t("selectPeriod")}
      />
    );
  };

  const convertToDhis2Period = () => {
    let startDate;
    let endDate;

    if (period.year && period.month) {
      setPeriod((prev) => ({
        ...prev,
        dhis2Period: `${period.year}${
          period.month < 10 ? "0" + period.month : period.month
        }`,
      }));
      startDate = moment([period.year, period.month - 1])
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment([period.year, period.month - 1])
        .endOf("month")
        .format("YYYY-MM-DD");

      const quarter = monthsToQuarters(period.month);
      setPeriod((prev) => ({ ...prev, startDate }));
      setPeriod((prev) => ({ ...prev, endDate }));
      setPeriod((prev) => ({ ...prev, periodType: "Monthly" }));
      setPeriod((prev) => ({ ...prev, quarter }));
    } else {
      setPeriod((prev) => ({ ...prev, dhis2Period: null }));
      setPeriod((prev) => ({ ...prev, startDate: "" }));
      setPeriod((prev) => ({ ...prev, endDate: "" }));
      setPeriod((prev) => ({ ...prev, periodType: "Monthly" }));
    }
  };

  useEffect(() => {
    convertToDhis2Period();
    onPeriodChange(period);
  }, [JSON.stringify(period)]);

  useEffect(() => {
    if (period.dhis2Period) setAnchorEl(null);
  }, [period.dhis2Period]);

  useEffect(() => {
    setPeriod((prev) => {
      if (_.isEmpty(prev)) return prev;
      return { ...prev, monthName: t(months[prev.month - 1]) };
    });
  }, [i18n.language]);

  return (
    <div className="period-selector-container">
      <div
        onClick={(event) => {
          if (!disabled) setAnchorEl(event.currentTarget);
        }}
      >
        {renderInputValue()}
      </div>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <div className="period-selector-popover-container">
          <MonthPopover
            period={period}
            onChange={(property, value) =>
              setPeriod((prev) => ({ ...prev, [property]: value }))
            }
          />
        </div>
      </Popover>
    </div>
  );
};

export default MonthSelector;

import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { useEffect } from "react";
import TextInput from "../TextInput/TextInput";
import useYearSelector from "../../hooks/useYearSelector";
import { months } from "../../constants";

const MonthPopover = ({ period, onChange }) => {
  const { t, i18n } = useTranslation();

  const { currentYear, nextYear, previousYear, modifyCurrentYear } =
    useYearSelector(onChange);

  const valueSet = months.map((month, index) => {
    return {
      value: index + 1,
      label: t(month) + " - " + currentYear,
    };
  });

  useEffect(() => {
    if (period.year) {
      modifyCurrentYear(period.year);
    }
  }, [period.year]);

  return (
    <div>
      <TextInput
        value={period.month}
        label={t("month")}
        valueType="TEXT"
        valueSet={valueSet}
        change={(value) => {
          onChange("year", currentYear);
          onChange("month", value);
          onChange("monthName", t(months[value - 1]));
        }}
      />
      <div className="period-selector-next-prev-year-container">
        <Button
          variant="contained"
          onClick={() => {
            onChange("month", "");
            onChange("monthName", "");
            previousYear();
          }}
        >
          {t("previousYear")}
        </Button>
        <span>{currentYear}</span>
        <Button
          variant="contained"
          onClick={() => {
            onChange("month", "");
            onChange("monthName", "");
            nextYear();
          }}
        >
          {t("nextYear")}
        </Button>
      </div>
    </div>
  );
};

export default MonthPopover;

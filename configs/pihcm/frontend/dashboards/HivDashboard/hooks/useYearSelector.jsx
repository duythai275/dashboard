import moment from "moment";
import { useState } from "react";

const useYearSelector = (onChange) => {
  const [currentYear, setCurrentYear] = useState(moment().year());

  const resetPeriod = () => {
    onChange("month", "");
    onChange("monthName", "");
    onChange("quarter", "");
    onChange("quarterName", "");
  };

  const nextYear = () => {
    resetPeriod();
    setCurrentYear(currentYear + 1);
  };

  const previousYear = () => {
    resetPeriod();
    setCurrentYear(currentYear - 1);
  };

  const modifyCurrentYear = (year) => {
    setCurrentYear(year);
  };

  return { currentYear, nextYear, previousYear, modifyCurrentYear };
};

export default useYearSelector;

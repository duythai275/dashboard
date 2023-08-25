import { getISOWeeksInYear } from "date-fns";
import _ from "lodash";

const findHeaderIndex = (headers, name) => {
  const found = headers.findIndex((header) => header.name === name);
  return found;
};
const transformDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  return `${year}${month}`;
};
const getListWeek = (selectedPeriod) => {
  if (!selectedPeriod) return [];
  const listWeek = (
    typeof selectedPeriod !== "object" ? [selectedPeriod] : selectedPeriod
  ).map((period) => getISOWeeksInYear(new Date(period)));

  const maxWeek = Math.max(...listWeek);
  return [...Array(maxWeek).keys()];
};

export { findHeaderIndex, transformDate, getListWeek };

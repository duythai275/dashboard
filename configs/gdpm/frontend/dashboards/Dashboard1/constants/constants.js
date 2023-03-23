import { getISOWeek, sub } from "date-fns";

export const THIS_YEAR = new Date().getFullYear();
export const LAST_YEAR = new Date().getFullYear() - 1;
export const THIS_WEEK = getISOWeek(new Date());
export const LAST_WEEK =
  getISOWeek(new Date()) > 1
    ? getISOWeek(new Date()) - 1
    : getISOWeek(sub(new Date(), { weeks: THIS_WEEK }));

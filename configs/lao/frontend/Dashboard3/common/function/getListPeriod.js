export const getListPeriod = (period) => {
  let listPeriodResult = [];
  let yearResult;
  let listYear = [];
  if (period.start.year === period.end.year) {
    yearResult = period.start.year;
    listYear.push(period.start.year);

    for (let i = period.start.month; i <= period.end.month; i++) {
      const month = i < 10 ? `0${i}` : i;
      const year = period.start.year;

      listPeriodResult.push(`${year}${month}`);
    }

    return { listPeriod: listPeriodResult, year: yearResult, listYear };
  }
  listYear.push(period.start.year, period.end.year);
  const totalMonthInStartYear = 12 - period.start.month + 1;
  const totalMonthInEndYear = period.end.month;
  yearResult =
    totalMonthInStartYear > totalMonthInEndYear
      ? period.start.year
      : period.end.year;
  if (12 - period.start.month)
    for (let i = period.start.month; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : i;
      const year = period.start.year;
      listPeriodResult.push(`${year}${month}`);
    }
  for (let i = 1; i <= period.end.month; i++) {
    const month = i < 10 ? `0${i}` : i;
    const year = period.end.year;
    listPeriodResult.push(`${year}${month}`);
  }
  return { listPeriod: listPeriodResult, year: yearResult, listYear };
};

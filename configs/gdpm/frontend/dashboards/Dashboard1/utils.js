export const findHeaderIndex = (headers, name) => {
  const found = headers.findIndex((header) => header.name === name);
  return found;
};

export const fillCaseData = (result, code, week) => {
  let value = 0;
  if (result.rows.length) {
    const rowValue = result.rows.find(
      (row) =>
        row[findHeaderIndex(result.headers, "Du5ydup8qQf")] === `${code}` &&
        row[findHeaderIndex(result.headers, "weekly")] === `${week}`
    );
    if (rowValue) value = rowValue[findHeaderIndex(result.headers, "cases")];
  }

  return value;
};

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

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] * 1 < a[orderBy] * 1) {
    return -1;
  }
  if (b[orderBy] * 1 > a[orderBy] * 1) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

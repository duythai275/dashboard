export const sortArray = (ouList, property) =>
  ouList.sort((a, b) => {
    if (!property) property = "name";
    const fa = a[property].toLowerCase(),
      fb = b[property].toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });

export const calculateAverage = (total, idx) => {
  switch (idx) {
    case 0:
      return Math.round(total / 20);
    case 1:
      return Math.round(total / 7);
    case 2:
      return Math.round(total / 13);
    default:
      return;
  }
};

export const getRowValue = (result, listId, ou) => {
  const ouIdx = result.headers.findIndex((item) => item.name === "ou");
  const dxIdx = result.headers.findIndex((item) => item.name === "dx");
  const valueIdx = result.headers.findIndex((item) => item.name === "value");
  return listId.map((id) => {
    const foundValue = result.rows.find(
      (row) => row[ouIdx] === ou && row[dxIdx] === id
    );

    return foundValue ? foundValue[valueIdx] : 0;
  });
};

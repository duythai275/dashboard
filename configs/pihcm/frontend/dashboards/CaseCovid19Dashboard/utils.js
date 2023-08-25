export const sortOu = (ouList, property) =>
  ouList.sort((a, b) => {
    if (!property) property = "displayName";
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

export const getRowValue = (result, listId, ou) => {
  let returnData;
  try {
    const ouIdx = result.headers.findIndex((item) => item.name === "ou");
    const dxIdx = result.headers.findIndex((item) => item.name === "dx");
    const valueIdx = result.headers.findIndex((item) => item.name === "value");
    returnData = listId.map((id) => {
      const foundValue = result.rows.find(
        (row) => row[ouIdx] === ou && row[dxIdx] === id
      );

      return foundValue ? foundValue[valueIdx] : 0;
    });
  } catch (error) {
    console.log(e);
    returnData = listId.map((id) => 0);
  } finally {
    return returnData;
  }
};

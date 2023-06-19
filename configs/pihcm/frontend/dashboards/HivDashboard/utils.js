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

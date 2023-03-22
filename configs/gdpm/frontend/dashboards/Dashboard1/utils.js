export const findHeaderIndex = (headers, name) => {
  const found = headers.findIndex((header) => header.name === name);
  return found;
};

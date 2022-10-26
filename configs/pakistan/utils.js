const sortStringInArrayOfObject = (array, property) => {
  return array.sort((a, b) => {
    const aProp = a[property].toUpperCase(); // ignore upper and lowercase
    const bProp = b[property].toUpperCase(); // ignore upper and lowercase
    if (aProp < bProp) {
      return -1;
    }
    if (aProp > bProp) {
      return 1;
    }
    return 0;
  });
};

export { sortStringInArrayOfObject };

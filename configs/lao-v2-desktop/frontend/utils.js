import axios from "axios";
const { VITE_PRODUCTION_BASE, VITE_APP_MODE } = import.meta.env;

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

const pull = async (url) => {
  return axios.get((VITE_APP_MODE === "production" ? VITE_PRODUCTION_BASE : "") + url);
};

export { sortStringInArrayOfObject, pull };

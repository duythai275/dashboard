const mapping = {
  lo: "la",
  vi: "vn",
  en: "gb"
};

const convertLanguageNametoCountryName = (languageName) => {
  return mapping[languageName] ? mapping[languageName] : "null";
};

export { convertLanguageNametoCountryName };

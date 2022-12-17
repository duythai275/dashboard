const mapping = {
  lo: "la",
  en: "gb"
};

const convertLanguageNametoCountryName = (languageName) => {
  return mapping[languageName] ? mapping[languageName] : "null";
};

export { convertLanguageNametoCountryName };

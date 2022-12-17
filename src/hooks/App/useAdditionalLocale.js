import { useTranslation } from "react-i18next";

const useAdditionalLocale = (locale, translations) => {
  const { t, i18n } = useTranslation();
  translations.forEach((translation) => {
    i18n.addResource(locale, "translation", translation.key, translation.value);
  });
};

export default useAdditionalLocale;

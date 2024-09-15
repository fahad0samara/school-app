import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as locales from "./locales";

const DEFAULT_LANGUAGE = "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    ...Object.entries(locales).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {}
    ),
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: "en",
});

export default i18n;

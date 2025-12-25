// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./locales/EN/entranslation.json";
import BN from "./locales/BN/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: { translation: EN },
      BN: { translation: BN },
    },
    lng: "EN", // default language
    fallbackLng: "BN",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/en.json';
import id from './i18n/id.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    // Set default language to Indonesian
    lng: 'id',            // Force default language
    fallbackLng: 'id',    // If no language is detected, fallback to ID
    detection: {
      // Optional: disable language detection if you want to always use 'id'
      // order: [], 
      // caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

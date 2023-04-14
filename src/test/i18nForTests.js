import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ENGLISH } from '../app/i18n/instance';
import es from '../app/i18n/translation/es.json';
import en from '../app/i18n/translation/en.json';

i18n.use(initReactI18next).init({
  fallbackLng: ENGLISH,
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
});

export default i18n;

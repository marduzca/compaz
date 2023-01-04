import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './translation/en.json';
import es from './translation/es.json';

export const SPANISH = 'es';
export const ENGLISH = 'en';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: SPANISH,
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  });

const isCurrentUserAgentABot =
  /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

if (isCurrentUserAgentABot) i18n.changeLanguage(SPANISH).then();

const currentLanguage = i18n.language.match(/en/i) ? ENGLISH : SPANISH;
document.documentElement.setAttribute('lang', currentLanguage);

export default i18n;

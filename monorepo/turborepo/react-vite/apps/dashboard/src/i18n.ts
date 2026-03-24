import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@repo/i18n';

const language = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en.dashboard },
      es: { translation: translations.es.dashboard },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

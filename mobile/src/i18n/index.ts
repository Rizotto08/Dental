import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import ru from './locales/ru.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: { ru: { translation: ru }, en: { translation: en } },
  lng: Localization.getLocales()[0]?.languageCode === 'en' ? 'en' : 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false }
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './en_US/common.json';
import enSys from './en_US/sys.json';
import enMenu from './en_US/menu.json';
import enDashboard from './en_US/dashboard.json';
import enLicenses from './en_US/licenses.json';

import viCommon from './vi_VN/common.json';
import viSys from './vi_VN/sys.json';
import viMenu from './vi_VN/menu.json';
import viDashboard from './vi_VN/dashboard.json';
import viLicenses from './vi_VN/licenses.json';

const resources = {
  en_US: {
    common: enCommon,
    sys: enSys,
    menu: enMenu,
    dashboard: enDashboard,
    licenses: enLicenses
  },
  vi_VN: {
    common: viCommon,
    sys: viSys,
    menu: viMenu,
    dashboard: viDashboard,
    licenses: viLicenses
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en_US',
    defaultNS: 'common',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'crm-language'
    },

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;

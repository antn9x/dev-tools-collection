import i18n from 'i18next';
import enUS from './en.json';
import vnVi from './vn.json';

i18n
  .init({
    // we init with resources
    resources: {
      en: {
        translations: enUS
      },
      vn: {
        translations: vnVi
      }
    },
    fallbackLng: 'vn',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;

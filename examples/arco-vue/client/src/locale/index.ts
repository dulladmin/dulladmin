import { createI18n as _createI18n } from 'vue-i18n';
import { LOCALE_OPTIONS, ARCO_MESSAGES, MESSAGES } from './messages';

type ARCO_MESSAGES_KEY = keyof typeof ARCO_MESSAGES;
type MESSAGES_KEY = keyof typeof MESSAGES;

const defaultLocale = () => {
  return LOCALE_OPTIONS[0].value;
};

const arcoMessages = (locale: string) => {
  return ARCO_MESSAGES[locale as ARCO_MESSAGES_KEY];
};

const i18n = (() => {
  let locale = localStorage.getItem('app.locale');
  if (locale == null || MESSAGES[locale as MESSAGES_KEY] == null) {
    locale = defaultLocale();
  }

  return _createI18n({
    legacy: false,
    locale,
    fallbackLocale: defaultLocale(),
    allowComposition: true,
    messages: MESSAGES,
  });
})();

export default i18n;
export { LOCALE_OPTIONS, arcoMessages };

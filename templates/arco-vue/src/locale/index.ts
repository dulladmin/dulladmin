import { createI18n as _createI18n } from 'vue-i18n';
import enUS from './en-US';
import jaJP from './ja-JP';
import zhCN from './zh-CN';

const LOCALE_OPTIONS = [
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
  { label: '中文', value: 'zh-CN' },
];

const i18n = (() => {
  let locale = localStorage.getItem('i18n.locale');
  if (locale == null) locale = 'en-US';

  return _createI18n({
    locale,
    fallbackLocale: 'en-US',
    allowComposition: true,
    messages: {
      'en-US': enUS,
      'ja-JP': jaJP,
      'zh-CN': zhCN,
    },
  });
})();

export default i18n;
export { LOCALE_OPTIONS };

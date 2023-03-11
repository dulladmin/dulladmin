import arcoenus from '@arco-design/web-vue/es/locale/lang/en-us';
import arcozhcn from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enus from './en-US';
import zhcn from './zh-CN';

export const LOCALE_OPTIONS = [
  { label: 'English', value: 'en-US' },
  { label: '简体中文', value: 'zh-CN' },
];

export const ARCO_MESSAGES = {
  'en-US': arcoenus,
  'zh-CN': arcozhcn,
};

export const MESSAGES = {
  'en-US': enus,
  'zh-CN': zhcn,
};

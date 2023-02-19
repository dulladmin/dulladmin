import { formatModules, i18nFooterCopyrightDate } from '../base';

const modules = import.meta.glob('./modules/*.json', { eager: true });
const i18nMessages: Record<string, string> = formatModules(modules, {});

export default {
  // components - navbar
  'navbar.language': '语言',
  'navbar.theme.toDark': '点击切换为暗黑模式',
  'navbar.theme.toLight': '点击切换为亮色模式',
  'navbar.screen.toExit': '点击退出全屏模式',
  'navbar.screen.toFull': '点击切换全屏模式',
  'navbar.user.logout': '登出账号',

  // components - tarbar
  'tabbar.actions.reloadCurrent': '重新加载',
  'tabbar.actions.closeCurrent': '关闭当前标签页',
  'tabbar.actions.closeCurrentToLeft': '关闭左侧标签页',
  'tabbar.actions.closeCurrentToRight': '关闭右侧标签页',
  'tabbar.actions.closeOthers': '关闭其他标签页',
  'tabbar.actions.closeAll': '关闭所有标签页',

  // components - breadcrumb
  'breadcrumb.actions.backToIndexView': '返回列表',

  // components - footer
  'footer.copyright': '版权所有',
  'footer.date': i18nFooterCopyrightDate(i18nMessages['site.creationDate']),
  'footer.allRightsReserved': '保留所有权利',

  // components - table
  'table.actions.search': '搜索',
  'table.actions.resetSearch': '重置',
  'table.actions.columnSetting': '列设置',
  'table.actions.refresh': '刷新',

  // components - form
  'form.actions.save': '保存',
  'form.actions.save.success': '保存成功',

  // components - auth
  'auth.login.success': '欢迎使用',
  'auth.logout.success': '登出成功',

  // views - login
  'login.title': '登入',
  'login.form.username.placeholder': '用户名',
  'login.form.username.presence.message': '不能为空',
  'login.form.password.placeholder': '密码',
  'login.form.password.presence.message': '不能为空',
  'login.form.login': '登入',

  // views - not-found
  'not-found.title': '没有找到相关页面',
  'not-found.descriptions.title': '没有找到相关页面',
  'not-found.descriptions.back': '返回',

  // .
  ...i18nMessages,
};

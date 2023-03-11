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
  'navbar.user.logout': '退出账号',

  // components - tarbar
  'tabbar.actions.reloadCurrent': '重新加载',
  'tabbar.actions.closeCurrent': '关闭当前标签页',
  'tabbar.actions.closeCurrentToLeft': '关闭左侧标签页',
  'tabbar.actions.closeCurrentToRight': '关闭右侧标签页',
  'tabbar.actions.closeOthers': '关闭其他标签页',
  'tabbar.actions.closeAll': '关闭所有标签页',

  // components - breadcrumb
  'breadcrumb.actions.back': '关闭 & 返回',

  // components - footer
  'footer.copyright': '版权所有',
  'footer.copyright.date': i18nFooterCopyrightDate(),
  'footer.allRightsReserved': '保留所有权利',

  // components - table
  'table.actions.search': '搜索',
  'table.actions.resetSearch': '重置',
  'table.actions.clearSearch': '清空搜索选项',
  'table.actions.columnSetting': '列设置',
  'table.actions.refresh': '刷新',
  'table.actions.new': '新建',
  'table.actions.show': '查看',
  'table.actions.edit': '编辑',
  'table.actions.delete': '删除',
  'table.actions.more': '更多操作',
  'table.columns.operations': '操作',

  // components - form
  'form.actions.new': '创建',
  'form.actions.new.success': '创建成功',
  'form.actions.edit': '更新',
  'form.actions.edit.success': '更新成功',
  'form.actions.delete': '删除',
  'form.actions.delete.success': '删除成功',
  'form.actions.delete.alert.message': '确认删除此记录？',
  'form.actions.save': '保存',
  'form.actions.save.success': '保存成功',

  // components - auth
  'auth.login.success': '欢迎使用',
  'auth.logout.success': '登出成功',

  // views - login
  'login.title': '登录',
  'login.form.username.placeholder': '用户名',
  'login.form.username.presence.message': '不能为空',
  'login.form.password.placeholder': '密码',
  'login.form.password.presence.message': '不能为空',
  'login.form.login': '登录',

  // views - not-found
  'not-found.title': '没有找到相关页面',
  'not-found.descriptions.title': '没有找到相关页面',
  'not-found.descriptions.back': '返回',

  // .
  ...i18nMessages,
};

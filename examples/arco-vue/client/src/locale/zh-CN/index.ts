function formatModules(_modules: any, result: Record<string, string>) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    result = { ...result, ...defaultModule };
  });
  return result;
}
const modules = import.meta.glob('./modules/*.json', { eager: true });
const i18nMessages: Record<string, string> = formatModules(modules, {});

export default {
  // components - messagebox
  'messagebox.logout.success': '登出成功',
  'messagebox.login.success': '欢迎使用',

  // components - navbar
  'navbar.language': '语言',
  'navbar.theme.toDark': '点击切换为暗黑模式',
  'navbar.theme.toLight': '点击切换为亮色模式',
  'navbar.screen.toExit': '点击退出全屏模式',
  'navbar.screen.toFull': '点击切换全屏模式',
  'navbar.user.logout': '登出账号',

  // components - table
  'table.actions.search': '搜索',
  'table.actions.resetSearch': '重置',
  'table.actions.columnSetting': '列设置',
  'table.actions.refresh': '刷新',

  // components - form
  'form.actions.save': '保存',

  // views - login
  'login.form.title': 'DullAdmin',
  'login.form.username.placeholder': '用户名',
  'login.form.username.presence.message': '不能为空',
  'login.form.password.placeholder': '密码',
  'login.form.password.presence.message': '不能为空',
  'login.form.login': '登入',

  // views - not-found
  'not-found.descriptions.title': '没有找到相关页面',
  'not-found.descriptions.back': '返回',

  // .
  ...i18nMessages,
};

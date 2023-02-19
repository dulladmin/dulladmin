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
  // components - navbar
  'navbar.language': 'Language',
  'navbar.theme.toDark': 'Click to use dark mode',
  'navbar.theme.toLight': 'Click to use light mode',
  'navbar.screen.toExit': 'Click to exit the full screen mode',
  'navbar.screen.toFull': 'Click to switch to full screen mode',
  'navbar.user.logout': 'Logout',

  // components - tarbar
  'tabbar.actions.reloadCurrent': 'Refresh',
  'tabbar.actions.closeCurrent': 'Close tab',
  'tabbar.actions.closeCurrentToLeft': 'Close tabs to the left',
  'tabbar.actions.closeCurrentToRight': 'Close tabs to the right',
  'tabbar.actions.closeOthers': 'Close other tabs',
  'tabbar.actions.closeAll': 'Close all tabs',

  // components - breadcrumb
  'breadcrumb.actions.backToIndexView': 'Back to index page',

  // components - footer
  'footer.copyright': 'Copyright',
  'footer.date': '2023-present',
  'footer.allRightsReserved': 'All rights reserved',

  // components - table
  'table.actions.search': 'Search',
  'table.actions.resetSearch': 'Reset',
  'table.actions.columnSetting': 'Column setting',
  'table.actions.refresh': 'Refresh',

  // components - form
  'form.actions.save': 'Save',
  'form.actions.save.success': 'Save success',

  // components - auth
  'auth.login.success': 'Welcome to use',
  'auth.logout.success': 'Logout success',

  // views - login
  'login.title': 'Login',
  'login.form.username.placeholder': 'Username',
  'login.form.username.presence.message': 'cannot be empty',
  'login.form.password.placeholder': 'Password',
  'login.form.password.presence.message': 'cannot be empty',
  'login.form.login': 'Login',

  // views - not-found
  'not-found.title': 'Page Not Found',
  'not-found.descriptions.title': 'Page Not Found',
  'not-found.descriptions.back': 'Back',

  // .
  ...i18nMessages,
};

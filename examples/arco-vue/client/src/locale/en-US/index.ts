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
  'messagebox.login.success': 'Welcome to use',
  'messagebox.logout.success': 'Logout success',

  // components - navbar
  'navbar.language': 'Language',
  'navbar.theme.toDark': 'Click to use dark mode',
  'navbar.theme.toLight': 'Click to use light mode',
  'navbar.screen.toExit': 'Click to exit the full screen mode',
  'navbar.screen.toFull': 'Click to switch to full screen mode',
  'navbar.user.logout': 'Logout',

  // components - table
  'table.actions.columnSetting': 'Column Setting',
  'table.actions.refresh': 'Refresh',

  // views - login
  'login.form.title': 'DullAdmin',
  'login.form.username.placeholder': 'Username',
  'login.form.username.presence.message': 'cannot be empty',
  'login.form.password.placeholder': 'Password',
  'login.form.password.presence.message': 'cannot be empty',
  'login.form.login': 'Login',

  // views - not-found
  'not-found.descriptions.title': 'Not Found',
  'not-found.descriptions.back': 'Back',

  // .
  ...i18nMessages,
};

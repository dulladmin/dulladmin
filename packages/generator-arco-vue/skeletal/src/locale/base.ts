import config from '@/config';

export function formatModules(_modules: any, result: Record<string, string>) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    result = { ...result, ...defaultModule };
  });
  return result;
}

export function i18nFooterCopyrightDate(): string {
  const creationDate = config['app.creationDate']
    ? new Date(config['app.creationDate'])
    : new Date();
  const sinceYear = creationDate.getFullYear().toString();
  const nowYear = new Date().getFullYear().toString();
  return sinceYear === nowYear ? sinceYear : `${sinceYear}-${nowYear}`;
}

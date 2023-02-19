export function formatModules(_modules: any, result: Record<string, string>) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    result = { ...result, ...defaultModule };
  });
  return result;
}

export function i18nFooterCopyrightDate(
  siteCreationDateStr: string | null
): string | null {
  if (siteCreationDateStr) {
    const siteCreationDate = new Date(siteCreationDateStr);
    const sinceYear = siteCreationDate.getFullYear().toString();
    const nowYear = new Date().getFullYear().toString();
    return sinceYear === nowYear ? sinceYear : `${sinceYear}-${nowYear}`;
  }
  return null;
}

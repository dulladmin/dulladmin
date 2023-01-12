import type { RouteRecordNormalized } from 'vue-router';

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

export default appRoutes;

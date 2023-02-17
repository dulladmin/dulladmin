import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

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
export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

// Routes: /login
export const ROUTE_LOGIN: RouteRecordRaw = {
  path: '/login',
  name: '$login',
  component: () => import('@/views/login/index.vue'),
};

// Routes: /
export const ROUTE_MAIN: RouteRecordRaw = {
  path: '/',
  name: '$app',
  component: () => import('@/layouts/main.vue'),
  children: appRoutes,
};

// Routes /:pathMatch(.*)*
export const ROUTE_NOT_FOUND: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '$not-found',
  component: () => import('@/views/not-found/index.vue'),
};

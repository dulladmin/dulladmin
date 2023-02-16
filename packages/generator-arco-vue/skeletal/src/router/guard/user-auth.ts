import type { Router, RouteRecordRaw, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress';
import { isLoggedIn } from '@/utils/auth';
import { appMenu } from '../app-menu';

const appRootRoute = () => {
  const travel = (_route: RouteRecordRaw[]): RouteRecordRaw | null => {
    let found = null;
    for (let i = 0; i < _route.length; i += 1) {
      const element = _route[i];
      if (element.children) {
        found = travel(element.children);
      } else {
        found = element;
      }
      if (found) break;
    }
    return found;
  };
  return travel(appMenu.value);
};

export default function setupUserAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (isLoggedIn()) {
      // redirect to root path
      if (to.name === '$app') {
        const rootRoute = appRootRoute();
        if (rootRoute != null) {
          next({ name: rootRoute.name });
          return;
        }
      }

      // continue
      next();
      return;
    }

    // redirect to $login if non-login
    if (to.name === '$login') {
      next();
    } else {
      next({
        name: '$login',
        query: {
          ...to.query,
          redirect: to.path,
        } as LocationQueryRaw,
      });
    }
  });
}

import type {
  Router,
  RouteLocationNormalized,
  RouteRecordRaw,
  LocationQueryRaw,
} from 'vue-router';
import NProgress from 'nprogress';
import { usePermission } from '@/hooks';
import { isLoggedIn } from '@/utils/auth';
import appMenuRoutes from '../app-menu';

const appRootRoute = () => {
  // search in appMenuRoutes to find an authorized RouteRecordRaw
  const travel = (
    _route: RouteRecordRaw[],
    fn: (route: RouteLocationNormalized | RouteRecordRaw) => boolean
  ): RouteRecordRaw | null => {
    let found = null;
    for (let i = 0; i < _route.length; i += 1) {
      const element = _route[i];
      if (element.children) {
        found = travel(element.children, fn);
      } else {
        found = fn(element) ? element : null;
      }
      if (found) break;
    }
    return found;
  };

  const { accessRouter } = usePermission();
  return travel(appMenuRoutes, accessRouter);
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
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}

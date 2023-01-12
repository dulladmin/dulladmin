import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress';
import { isLoggedIn } from '@/utils/auth';

export default function setupUserAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (isLoggedIn()) {
      next();
      return;
    }

    if (to.name === 'login') {
      next();
      return;
    }

    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    });
  });
}

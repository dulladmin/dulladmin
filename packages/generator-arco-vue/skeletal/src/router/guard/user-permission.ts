import type { Router } from 'vue-router';
import NProgress from 'nprogress';

export default function setupUserPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    next();
    NProgress.done();
  });
}

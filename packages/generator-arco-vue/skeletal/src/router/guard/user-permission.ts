import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import { usePermission } from '@/hooks';

export default function setupUserPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const { accessRouter } = usePermission();

    if (accessRouter(to)) {
      next();
    } else {
      next({ name: '$not-found' });
    }

    NProgress.done();
  });
}

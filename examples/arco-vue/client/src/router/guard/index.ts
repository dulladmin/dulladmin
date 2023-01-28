import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserAuthGuard from './user-auth';
import setupUserPermissionGuard from './user-permission';

export default function createRouteGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to);
  });

  setupUserAuthGuard(router);
  setupUserPermissionGuard(router);
}

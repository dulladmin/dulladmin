import type { Router } from 'vue-router';
import setupUserAuthGuard from './user-auth';
import setupUserPermissionGuard from './user-permission';

export default function createRouteGuard(router: Router) {
  setupUserAuthGuard(router);
  setupUserPermissionGuard(router);
}

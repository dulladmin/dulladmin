import type { Router } from 'vue-router';
import i18n from '@/locale';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserAuthGuard from './user-auth';
import setupUserPermissionGuard from './user-permission';

export default function createRouteGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    setRouteEmitter(to, from);
  });

  setupUserAuthGuard(router);
  setupUserPermissionGuard(router);

  router.afterEach(async (to, from) => {
    const siteTitle = 'site.name';
    const pageTitle = to.meta?.title ?? '';
    if (pageTitle) {
      window.document.title = `${i18n.global.t(pageTitle)} - ${i18n.global.t(
        siteTitle
      )}`;
    } else {
      window.document.title = i18n.global.t(siteTitle);
    }
  });
}

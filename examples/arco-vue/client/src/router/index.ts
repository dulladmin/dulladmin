import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { ROUTE_LOGIN, ROUTE_MAIN, ROUTE_NOT_FOUND, appRoutes } from './routes';
import createRouteGuard from './guard';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [ROUTE_LOGIN, ROUTE_MAIN, ROUTE_NOT_FOUND],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export { appRoutes };
export default router;

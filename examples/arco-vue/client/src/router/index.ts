import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import appRoutes from './routes';
import {
  ROUTE_ROOT,
  ROUTE_LOGIN,
  ROUTE_WELCOME,
  ROUTE_NOT_FOUND,
} from './routes/base';
import createRouteGuard from './guard';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ROUTE_ROOT,
    ROUTE_LOGIN,
    ROUTE_WELCOME,
    ...appRoutes,
    ROUTE_NOT_FOUND,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;

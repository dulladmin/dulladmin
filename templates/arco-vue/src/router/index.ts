import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import appRoutes from './routes';
import createRouteGuard from './guard';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    ...appRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;

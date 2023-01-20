import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'users',
  name: 'users#index',
  component: () => import('@/views/modules/users/index/index.vue'),
});

export default routes;

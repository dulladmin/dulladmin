import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'albums',
  name: 'albums#index',
  component: () => import('@/views/modules/albums/index/index.vue'),
});

export default routes;

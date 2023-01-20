import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'photos',
  name: 'photos#index',
  component: () => import('@/views/modules/photos/index/index.vue'),
});

export default routes;

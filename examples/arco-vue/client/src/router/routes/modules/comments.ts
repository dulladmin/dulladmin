import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'comments',
  name: 'comments#index',
  component: () => import('@/views/modules/comments/index/index.vue'),
});

export default routes;

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'posts',
  name: 'posts#index',
  component: () => import('@/views/modules/posts/index/index.vue'),
});

export default routes;

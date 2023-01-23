/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [];

routes.push({
  path: 'albums',
  name: 'albums--index',
  component: () => import('@/views/modules/albums/index/index.vue'),
});
routes.push({
  path: 'albums/:id',
  name: 'albums--show',
  component: () => import('@/views/modules/albums/show/index.vue'),
});

export default routes;
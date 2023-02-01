/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'albums--index',
    path: 'albums',
    component: () => import('@/views/modules/albums/index/index.vue'),
    meta: {
      authority: ['*', ],
    },
  },
  {
    name: 'albums--show',
    path: 'albums/:id',
    component: () => import('@/views/modules/albums/show/index.vue'),
    meta: {
      authority: ['*', ],
    },
  },
];

export default routes;

/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'PhotosIndex',
    path: 'photos',
    component: () => import('@/views/modules/photos/index/index.vue'),
    meta: {
      authority: ['*', ],
      cache: true,
      title: 'photos--index.title',
    },
  },
  {
    name: 'PhotosShow',
    path: 'photos/:id',
    component: () => import('@/views/modules/photos/show/index.vue'),
    meta: {
      authority: ['*', ],
      cache: false,
      title: 'photos--show.title',
    },
  },
];

export default routes;

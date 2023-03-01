/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'AdministratorsIndex',
    path: 'administrators',
    component: () => import('@/views/modules/administrators/index/index.vue'),
    meta: {
      authority: ['admin', ],
      cache: true,
      title: 'administrators--index.title',
    },
  },
  {
    name: 'AdministratorsShow',
    path: 'administrators/:id',
    component: () => import('@/views/modules/administrators/show/index.vue'),
    meta: {
      authority: ['admin', ],
      cache: false,
      title: 'administrators--show.title',
    },
  },
  {
    name: 'AdministratorsNew',
    path: 'administrators/new',
    component: () => import('@/views/modules/administrators/new/index.vue'),
    meta: {
      authority: ['admin', ],
      cache: false,
      title: 'administrators--new.title',
    },
  },
  {
    name: 'AdministratorsEdit',
    path: 'administrators/:id/edit',
    component: () => import('@/views/modules/administrators/edit/index.vue'),
    meta: {
      authority: ['admin', ],
      cache: false,
      title: 'administrators--edit.title',
    },
  },
  {
    name: 'AdministratorsDelete',
    path: 'administrators/:id/delete',
    component: () => import('@/views/modules/administrators/delete/index.vue'),
    meta: {
      authority: ['admin', ],
      cache: false,
      title: 'administrators--delete.title',
    },
  },
];

export default routes;

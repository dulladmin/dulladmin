/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'AdministratorsIndex',
    path: 'administrators',
    component: () => import('@/views/modules/administrators/index/index.vue'),
    meta: {
      nameComponents: ['Administrators', 'Index', ],
      authority: ['admin', ],
      cache: true,
      title: 'administrators--index.title',
    },
  },
  {
    name: 'AdministratorsNew',
    path: 'administrators/new',
    component: () => import('@/views/modules/administrators/new/index.vue'),
    meta: {
      nameComponents: ['Administrators', 'New', ],
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
      nameComponents: ['Administrators', 'Edit', ],
      authority: ['admin', ],
      cache: false,
      title: 'administrators--edit.title',
    },
  },
];

export default routes;

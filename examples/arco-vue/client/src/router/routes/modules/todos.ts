/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'todos--index',
    path: 'todos',
    component: () => import('@/views/modules/todos/index/index.vue'),
    meta: {
      authority: ['*', ],
    },
  },
  {
    name: 'todos--new',
    path: 'todos/new',
    component: () => import('@/views/modules/todos/new/index.vue'),
    meta: {
      authority: ['*', ],
    },
  },
  {
    name: 'todos--edit',
    path: 'todos/:id/edit',
    component: () => import('@/views/modules/todos/edit/index.vue'),
    meta: {
      authority: ['*', ],
    },
  },
];

export default routes;

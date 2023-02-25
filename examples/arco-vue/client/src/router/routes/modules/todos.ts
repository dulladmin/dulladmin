/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'TodosIndex',
    path: 'todos',
    component: () => import('@/views/modules/todos/index/index.vue'),
    meta: {
      nameComponents: ['Todos', 'Index', ],
      authority: ['*', ],
      cache: true,
      title: 'todos--index.title',
    },
  },
  {
    name: 'TodosShow',
    path: 'todos/:id',
    component: () => import('@/views/modules/todos/show/index.vue'),
    meta: {
      nameComponents: ['Todos', 'Show', ],
      authority: ['*', ],
      cache: false,
      title: 'todos--show.title',
    },
  },
  {
    name: 'TodosNew',
    path: 'todos/new',
    component: () => import('@/views/modules/todos/new/index.vue'),
    meta: {
      nameComponents: ['Todos', 'New', ],
      authority: ['*', ],
      cache: false,
      title: 'todos--new.title',
    },
  },
  {
    name: 'TodosEdit',
    path: 'todos/:id/edit',
    component: () => import('@/views/modules/todos/edit/index.vue'),
    meta: {
      nameComponents: ['Todos', 'Edit', ],
      authority: ['*', ],
      cache: false,
      title: 'todos--edit.title',
    },
  },
  {
    name: 'TodosDelete',
    path: 'todos/:id/delete',
    component: () => import('@/views/modules/todos/delete/index.vue'),
    meta: {
      nameComponents: ['Todos', 'Delete', ],
      authority: ['admin', ],
      cache: false,
      title: 'todos--delete.title',
    },
  },
];

export default routes;

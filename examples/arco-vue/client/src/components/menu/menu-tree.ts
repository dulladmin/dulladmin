/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const menuTree: RouteRecordRaw[] = [
  {
    path: '',
    children: [
      {
        path: 'users',
        name: 'users--index',
        component: () => import('@/views/modules/users/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
      {
        path: 'albums',
        name: 'albums--index',
        component: () => import('@/views/modules/albums/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
      {
        path: 'photos',
        name: 'photos--index',
        component: () => import('@/views/modules/photos/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
  },
  {
    path: '',
    children: [
      {
        path: 'posts',
        name: 'posts--index',
        component: () => import('@/views/modules/posts/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
      {
        path: 'comments',
        name: 'comments--index',
        component: () => import('@/views/modules/comments/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
  },
  {
    path: '',
    children: [
      {
        path: 'todos',
        name: 'todos--index',
        component: () => import('@/views/modules/todos/index/index.vue'),
        meta: {
          roles: ['*'],
        },
      },
  },
];

export default menuTree;

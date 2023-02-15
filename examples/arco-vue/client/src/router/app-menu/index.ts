/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const appMenuRoutes: RouteRecordRaw[] = [
  {
    name: '--users-management',
    path: '--users-management',
    children: [
      {
        name: 'users--index',
        path: 'users',
        component: () => import('@/views/modules/users/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-user-group',
          title: 'users--index.title',
        },
      },
      {
        name: 'albums--index',
        path: 'albums',
        component: () => import('@/views/modules/albums/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-folder',
          title: 'albums--index.title',
        },
      },
      {
        name: 'photos--index',
        path: 'photos',
        component: () => import('@/views/modules/photos/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-image',
          title: 'photos--index.title',
        },
      },
    ],
    meta: {
      icon: 'icon-user-group',
      title: 'menu.submenu.users-management',
    },
  },
  {
    name: '--posts-management',
    path: '--posts-management',
    children: [
      {
        name: 'posts--index',
        path: 'posts',
        component: () => import('@/views/modules/posts/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-file',
          title: 'posts--index.title',
        },
      },
      {
        name: 'comments--index',
        path: 'comments',
        component: () => import('@/views/modules/comments/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-reply',
          title: 'comments--index.title',
        },
      },
    ],
    meta: {
      icon: 'icon-file',
      title: 'menu.submenu.posts-management',
    },
  },
  {
    name: '--todos-management',
    path: '--todos-management',
    children: [
      {
        name: 'todos--index',
        path: 'todos',
        component: () => import('@/views/modules/todos/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-list',
          title: 'todos--index.title',
        },
      },
    ],
    meta: {
      icon: 'icon-list',
      title: 'menu.submenu.todos-management',
    },
  },
  {
    name: '--system-management',
    path: '--system-management',
    children: [
      {
        name: 'administrators--index',
        path: 'administrators',
        component: () => import('@/views/modules/administrators/index/index.vue'),
        meta: {
          authority: ['admin', ],
          icon: 'icon-user-group',
          title: 'administrators--index.title',
        },
      },
    ],
    meta: {
      icon: 'icon-settings',
      title: 'menu.submenu.system-management',
    },
  },
];

export default appMenuRoutes;

/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const menuTree: RouteRecordRaw[] = [
  {
    name: '--users-management',
    path: '--users-management',
    children: [
      {
        name: 'users--index',
        path: 'users',
        component: () => import('@/views/modules/users/index/index.vue'),
        meta: {
          authority: ['*'],
          icon: 'icon-user-group',
          title: 'menu.menuitem.users',
        },
      },
      {
        name: 'albums--index',
        path: 'albums',
        component: () => import('@/views/modules/albums/index/index.vue'),
        meta: {
          authority: ['*'],
          icon: 'icon-folder',
          title: 'menu.menuitem.albums',
        },
      },
      {
        name: 'photos--index',
        path: 'photos',
        component: () => import('@/views/modules/photos/index/index.vue'),
        meta: {
          authority: ['*'],
          icon: 'icon-image',
          title: 'menu.menuitem.photos',
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
          authority: ['*'],
          icon: 'icon-file',
          title: 'menu.menuitem.posts',
        },
      },
      {
        name: 'comments--index',
        path: 'comments',
        component: () => import('@/views/modules/comments/index/index.vue'),
        meta: {
          authority: ['*'],
          icon: 'icon-reply',
          title: 'menu.menuitem.comments',
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
          authority: ['*'],
          icon: 'icon-list',
          title: 'menu.menuitem.todos',
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
          authority: ['*'],
          icon: 'icon-user-group',
          title: 'menu.menuitem.administrators',
        },
      },
    ],
    meta: {
      icon: 'icon-settings',
      title: 'menu.submenu.system-management',
    },
  },
];

export default menuTree;

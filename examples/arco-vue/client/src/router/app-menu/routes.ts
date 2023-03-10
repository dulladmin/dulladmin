/* Code generated by DullAdmin; DO NOT EDIT. */

import type { RouteRecordRaw } from 'vue-router';

const appMenuRoutes: RouteRecordRaw[] = [
  {
    name: '--dashboard',
    path: '--dashboard',
    children: [
      {
        name: 'DashboardShow',
        path: 'dashboard',
        component: () => import('@/views/modules/dashboard/show/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-dashboard',
          title: 'dashboard--show.title',
        },
      },
    ],
    meta: {
      icon: 'icon-dashboard',
      title: 'menu.submenu.dashboard',
    },
  },
  {
    name: '--users-management',
    path: '--users-management',
    children: [
      {
        name: 'UsersIndex',
        path: 'users',
        component: () => import('@/views/modules/users/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-user-group',
          title: 'users--index.title',
        },
      },
      {
        name: 'AlbumsIndex',
        path: 'albums',
        component: () => import('@/views/modules/albums/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-folder',
          title: 'albums--index.title',
        },
      },
      {
        name: 'PhotosIndex',
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
        name: 'PostsIndex',
        path: 'posts',
        component: () => import('@/views/modules/posts/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-file',
          title: 'posts--index.title',
        },
      },
      {
        name: 'CommentsIndex',
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
        name: 'TodosIndex',
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
        name: 'AdministratorsIndex',
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
  {
    name: '--examples',
    path: '--examples',
    children: [
      {
        name: 'TablesIndex',
        path: 'tables',
        component: () => import('@/views/modules/tables/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-nav',
          title: 'tables--index.title',
        },
      },
      {
        name: 'DescriptionsIndex',
        path: 'descriptions',
        component: () => import('@/views/modules/descriptions/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-sort',
          title: 'descriptions--index.title',
        },
      },
      {
        name: 'ChartsIndex',
        path: 'charts',
        component: () => import('@/views/modules/charts/index/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-bar-chart',
          title: 'charts--index.title',
        },
      },
      {
        name: 'CustomShow',
        path: 'custom',
        component: () => import('@/views/modules/custom/show/index.vue'),
        meta: {
          authority: ['*', ],
          icon: 'icon-palette',
          title: 'custom--show.title',
        },
      },
    ],
    meta: {
      icon: 'icon-mosaic',
      title: 'menu.submenu.examples',
    },
  },
];

export default appMenuRoutes;

import type { RouteRecordRaw } from 'vue-router';

export const MAIN_LAYOUT = () => import('@/layouts/main.vue');

// Routes: /
export const ROUTE_ROOT: RouteRecordRaw = {
  path: '/',
  redirect: { name: '$login' },
};

// Routes: /login
export const ROUTE_LOGIN: RouteRecordRaw = {
  path: '/login',
  name: '$login',
  component: () => import('@/views/login/index.vue'),
};

// Routes: /welcome
export const ROUTE_WELCOME: RouteRecordRaw = {
  path: '/welcome-',
  component: MAIN_LAYOUT,
  redirect: { name: '$welcome' },
  meta: {
    hideInMenu: true,
  },
  children: [
    {
      path: '/welcome',
      name: '$welcome',
      component: () => import('@/views/welcome/index.vue'),
      meta: {
        hideInMenu: true,
      },
    },
  ],
};

// Routes /:pathMatch(.*)*
export const ROUTE_NOT_FOUND: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: '$not-found',
  component: () => import('@/views/not-found/index.vue'),
};

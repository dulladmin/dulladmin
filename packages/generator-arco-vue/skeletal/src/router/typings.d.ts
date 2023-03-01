import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    authority?: string[]; // controls authority that have access to the page
    cache?: boolean; // cache the page when tabbar item hidden
    icon?: string; // the icon show in the side menu
    title?: string; // the locale name show in side menu, tabbar, etc
  }
}

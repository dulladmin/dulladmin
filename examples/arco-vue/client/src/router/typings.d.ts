import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    authority?: string[]; // Controls authority that have access to the page
    icon?: string; // The icon show in the side menu
    title?: string; // The locale name show in side menu
  }
}
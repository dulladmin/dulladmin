import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[]; // Controls roles that have access to the page
    icon?: string; // The icon show in the side menu
    title?: string; // The locale name show in side menu
  }
}

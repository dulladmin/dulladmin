import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    nameComponents?: string[]; // Components of the page name
    authority?: string[]; // Controls authority that have access to the page
    cache?: boolean; // Cache the page when tabbar item hidden
    icon?: string; // The icon show in the side menu
    title?: string; // The locale name show in side menu, tabbar, etc
  }
}

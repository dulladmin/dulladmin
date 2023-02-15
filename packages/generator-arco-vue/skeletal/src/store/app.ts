import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';

export type Tab = RouteLocationNormalized;

const useAppStore = defineStore('app', () => {
  // device
  const device = ref<string>('desktop');
  const changeDevice = (dev: string) => {
    device.value = dev;
  };
  const isMobile = computed((): boolean => {
    return device.value === 'mobile';
  });

  // theme
  const theme = ref<string>('light');
  const changeTheme = (dark: boolean) => {
    if (dark) {
      theme.value = 'dark';
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      theme.value = 'light';
      document.body.removeAttribute('arco-theme');
    }
  };

  // menu
  const menuCollapse = ref<boolean>(false);
  const changeMenuCollapse = (collapse: boolean) => {
    menuCollapse.value = collapse;
  };

  // tabbar
  const tabs = ref<Tab[]>([]);
  const currentTab = ref<Tab | null>(null);
  const nextTab = (tabIndex: number): Tab => {
    return tabs.value[tabIndex] ?? { name: '$app' };
  };
  const addTab = (newRoute: RouteLocationNormalized) => {
    if (newRoute.matched[0].name === '$app') {
      if (newRoute.name === '$app') return;

      const tab = newRoute;
      const found = tabs.value.find((e) => e.fullPath === tab.fullPath);
      if (found) {
        currentTab.value = tab;
      } else {
        tabs.value.push(tab);
        currentTab.value = tab;
      }
    } else {
      tabs.value = [];
      currentTab.value = null;
    }
  };
  const removeCurrentTab = (tab: Tab, tabIndex: number): Tab | null => {
    tabs.value.splice(tabIndex, 1);

    const found = tabs.value.find(
      (e) => e.fullPath === currentTab.value?.fullPath
    );
    if (found) return null;

    currentTab.value = null;
    return nextTab(Math.min(tabIndex, tabs.value.length - 1));
  };
  const removeCurrentTabToTheLeft = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(0, tabIndex);

    const found = tabs.value.find(
      (e) => e.fullPath === currentTab.value?.fullPath
    );
    if (found) return null;

    currentTab.value = null;
    return nextTab(0);
  };
  const removeCurrentTabToTheRight = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(tabIndex + 1, tabs.value.length - tabIndex - 1);

    const found = tabs.value.find(
      (e) => e.fullPath === currentTab.value?.fullPath
    );
    if (found) return null;

    currentTab.value = null;
    return nextTab(tabIndex);
  };
  const removeOtherTabs = (tab: Tab): Tab | null => {
    tabs.value = [tab];
    currentTab.value = tab;
    return nextTab(0);
  };
  const removeAllTabs = (): Tab | null => {
    tabs.value = [];
    currentTab.value = null;
    return nextTab(0);
  };

  return {
    device,
    changeDevice,
    isMobile,

    theme,
    changeTheme,

    menuCollapse,
    changeMenuCollapse,

    tabs,
    currentTab,
    addTab,
    removeCurrentTab,
    removeCurrentTabToTheLeft,
    removeCurrentTabToTheRight,
    removeOtherTabs,
    removeAllTabs,
  };
});

export default useAppStore;

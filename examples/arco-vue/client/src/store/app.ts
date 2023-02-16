import { computed, ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
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
  const menuCollapse = useStorage<boolean>(
    'app.menuCollapse',
    false,
    localStorage
  );
  const changeMenuCollapse = (collapse: boolean) => {
    menuCollapse.value = collapse;
  };

  // tabbar
  const cachedTabs = ref<string[]>([]);
  const tabs = ref<Tab[]>([]);
  const currentTab = ref<Tab | null>(null);
  const nextTab = (tabIndex: number): Tab => {
    return tabs.value[tabIndex] ?? { name: '$app' };
  };
  const addTab = (to: RouteLocationNormalized) => {
    if (to.matched[0].name === '$app') {
      if (to.name === '$app') return;

      // switch to tab
      const toIndex = tabs.value.findIndex((e) => e.name === to.name);
      if (toIndex !== -1) {
        tabs.value.splice(toIndex, 1, to);
        currentTab.value = to;
        return;
      }

      // open new tab next to the current tab
      if (currentTab.value != null) {
        const currentIndex = tabs.value.findIndex(
          (e) => e.name === currentTab.value?.name
        );
        if (currentIndex !== -1) {
          tabs.value.splice(currentIndex + 1, 0, to);
          currentTab.value = to;
          return;
        }
      }

      // make new tab open at the end of the tabs
      tabs.value.push(to);
      currentTab.value = to;
    } else {
      tabs.value = [];
      currentTab.value = null;
    }
  };
  const removeCurrentTab = (tab: Tab, tabIndex: number): Tab | null => {
    tabs.value.splice(tabIndex, 1);

    const found = tabs.value.find((e) => e.name === currentTab.value?.name);
    if (found) return null;

    currentTab.value = null;
    return nextTab(Math.min(tabIndex, tabs.value.length - 1));
  };
  const removeCurrentTabToTheLeft = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(0, tabIndex);

    const found = tabs.value.find((e) => e.name === currentTab.value?.name);
    if (found) return null;

    currentTab.value = null;
    return nextTab(0);
  };
  const removeCurrentTabToTheRight = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(tabIndex + 1, tabs.value.length - tabIndex - 1);

    const found = tabs.value.find((e) => e.name === currentTab.value?.name);
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
  watch(
    () => tabs.value,
    (val) => {
      cachedTabs.value = val
        .filter((tab) => {
          return tab.meta.cache as boolean;
        })
        .map((tab) => {
          return tab.name as string;
        });
    },
    { deep: true, immediate: true }
  );
  const clearCurrentTab = () => {
    currentTab.value = null;
  };

  return {
    device,
    changeDevice,
    isMobile,

    theme,
    changeTheme,

    menuCollapse,
    changeMenuCollapse,

    cachedTabs,
    tabs,
    addTab,
    removeCurrentTab,
    removeCurrentTabToTheLeft,
    removeCurrentTabToTheRight,
    removeOtherTabs,
    removeAllTabs,
    currentTab,
    clearCurrentTab,
  };
});

export default useAppStore;

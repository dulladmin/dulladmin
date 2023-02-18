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
  const currentActiveTab = ref<Tab | null>(null);
  const nextActiveTab = (tabIndex: number): Tab => {
    return tabs.value[tabIndex] ?? { name: '$app' };
  };
  const addTab = (to: RouteLocationNormalized) => {
    if (to.matched[0].name === '$app') {
      if (to.name === '$app') return;

      // switch to tab
      const toIndex = tabs.value.findIndex((e) => e.name === to.name);
      if (toIndex !== -1) {
        tabs.value.splice(toIndex, 1, to);
        currentActiveTab.value = to;
        return;
      }

      // open new tab next to the current active tab
      if (currentActiveTab.value != null) {
        const currentIndex = tabs.value.findIndex(
          (e) => e.name === currentActiveTab.value?.name
        );
        if (currentIndex !== -1) {
          tabs.value.splice(currentIndex + 1, 0, to);
          currentActiveTab.value = to;
          return;
        }
      }

      // open new tab open at the end of the tabs
      tabs.value.push(to);
      currentActiveTab.value = to;
    } else {
      tabs.value = [];
      currentActiveTab.value = null;
    }
  };
  const removeCurrentTab = (tab: Tab, tabIndex: number): Tab | null => {
    tabs.value.splice(tabIndex, 1);

    const found = tabs.value.find(
      (e) => e.name === currentActiveTab.value?.name
    );
    if (found) return null;

    currentActiveTab.value = null;
    return nextActiveTab(Math.min(tabIndex, tabs.value.length - 1));
  };
  const removeCurrentTabToTheLeft = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(0, tabIndex);

    const found = tabs.value.find(
      (e) => e.name === currentActiveTab.value?.name
    );
    if (found) return null;

    currentActiveTab.value = null;
    return nextActiveTab(0);
  };
  const removeCurrentTabToTheRight = (
    tab: Tab,
    tabIndex: number
  ): Tab | null => {
    tabs.value.splice(tabIndex + 1, tabs.value.length - tabIndex - 1);

    const found = tabs.value.find(
      (e) => e.name === currentActiveTab.value?.name
    );
    if (found) return null;

    currentActiveTab.value = null;
    return nextActiveTab(tabIndex);
  };
  const removeOtherTabs = (tab: Tab): Tab | null => {
    tabs.value = [tab];
    currentActiveTab.value = tab;
    return nextActiveTab(0);
  };
  const removeAllTabs = (): Tab | null => {
    tabs.value = [];
    currentActiveTab.value = null;
    return nextActiveTab(0);
  };
  const removeCurrentActiveTab = () => {
    const foundIndex = tabs.value.findIndex(
      (e) => e.name === currentActiveTab.value?.name
    );
    tabs.value.splice(foundIndex, 1);
    currentActiveTab.value = null;
  };
  const clearCurrentActiveTab = () => {
    currentActiveTab.value = null;
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
    currentActiveTab,
    addTab,
    removeCurrentTab,
    removeCurrentTabToTheLeft,
    removeCurrentTabToTheRight,
    removeOtherTabs,
    removeAllTabs,
    removeCurrentActiveTab,
    clearCurrentActiveTab,
  };
});

export default useAppStore;

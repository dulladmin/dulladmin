<template>
  <a-menu
    v-model:collapsed="collapsed"
    v-model:selected-keys="selectedKey"
    style="height: 100%; width: 100%"
    :show-collapse-button="showCollapseButton"
    :auto-open-selected="true"
    :auto-open="true"
    :mode="mode"
  >
    <renderFn />
  </a-menu>
</template>

<script lang="tsx" setup>
  import { compile, computed, h, ref, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, RouteRecordRaw } from 'vue-router';
  import { appMenu, findAppMenuItem } from '@/router/app-menu';
  import { useAppStore, useUserStore } from '@/store';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import type { RouteChangeEvent } from '@/utils/route-listener';

  // i18n
  const { t } = useI18n();

  // store
  const appStore = useAppStore();
  const userStore = useUserStore();

  // mode
  const mode = computed(() => (appStore.topMenu ? 'horizontal' : 'vertical'));

  // collapsed
  const collapsed = computed({
    get: () => {
      return appStore.topMenu || appStore.isMobile
        ? false
        : appStore.menuCollapse;
    },
    set: (value: boolean) => {
      return appStore.changeMenuCollapse(value);
    },
  });
  const showCollapseButton = computed(() => !appStore.isMobile);

  // selectedKey
  const selectedKey = ref<string[]>([]);
  const routeChangeHandler = (e: RouteChangeEvent) => {
    const { to } = e;
    if (to.matched[0].name === '$app') {
      if (to.name === '$app') return;

      const ancestors = findAppMenuItem(to);
      const item = ancestors[ancestors.length - 1];
      selectedKey.value = item ? [item.name as string] : [];
    } else {
      selectedKey.value = [];
    }
  };
  listenerRouteChange(routeChangeHandler, true);
  onUnmounted(() => removeRouteListener(routeChangeHandler));

  // select
  const router = useRouter();
  const goto = (item: RouteRecordRaw) => {
    // switch to tab
    const tab = appStore.tabs.find((e) => e.name === item.name);
    if (tab) {
      router.push({ ...tab });
      return;
    }

    // open new tab at the end of the tabs
    appStore.setNewTabOpenPosition(appStore.tabs.length);
    router.push({ name: item.name });
  };

  // render
  const renderFn = () => {
    const travel = (_route: RouteRecordRaw[]) => {
      return _route.map((element) => {
        const icon = element!.meta!.icon
          ? () => h(compile(`<${element!.meta!.icon}/>`))
          : null;
        return element.children ? (
          <a-sub-menu
            key={element.name}
            title={t(element!.meta!.title!)}
            v-slots={{ icon }}
          >
            {travel(element.children)}
          </a-sub-menu>
        ) : (
          <a-menu-item
            key={element.name}
            v-slots={{ icon }}
            onClick={() => goto(element)}
          >
            {t(element!.meta!.title!)}
          </a-menu-item>
        );
      });
    };
    return travel(appMenu.value);
  };
</script>

<style lang="less" scoped></style>

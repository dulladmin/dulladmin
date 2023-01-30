<template>
  <a-menu
    v-model:collapsed="collapsed"
    v-model:selected-keys="selectedKey"
    style="height: 100%; width: 100%"
    :show-collapse-button="showCollapseButton"
    :auto-open-selected="true"
    :auto-open="true"
  >
    <renderFn />
  </a-menu>
</template>

<script lang="tsx" setup>
  import { compile, computed, h, ref, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, RouteRecordRaw } from 'vue-router';
  import cloneDeep from 'lodash/cloneDeep';
  import { usePermission } from '@/hooks';
  import { useAppStore, useUserStore } from '@/store';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import menuTreeData from './menu-tree';

  // i18n
  const { t } = useI18n();

  // store
  const appStore = useAppStore();
  const userStore = useUserStore();

  // menuTree
  const { accessRouter } = usePermission();
  const menuTree = computed(() => {
    // recursive filter unauthorized RouteRecordRaw
    const travel = (_route: RouteRecordRaw[], nodes = []) => {
      _route.forEach((element) => {
        // submenu
        if (element.children) {
          const children = travel(element.children);
          if (children.length === 0) return;
          element.children = children;
          nodes.push(element);
          return;
        }
        // menuitem
        if (accessRouter(element)) {
          nodes.push(element);
        }
      });
      return nodes;
    };
    return travel(cloneDeep(menuTreeData));
  });

  // collapsed
  const collapsed = computed({
    get: () => (appStore.isMobile ? false : appStore.menuCollapse),
    set: (value: boolean) => appStore.changeMenuCollapse(value),
  });
  const showCollapseButton = computed(() => !appStore.isMobile);

  // selectedKey
  const selectedKey = ref<string[]>([]);
  listenerRouteChange((newRoute) => {
    // recursive search in menuTree to find a RouteRecordRaw by :path
    const travel = (
      _route: RouteRecordRaw[],
      path: string
    ): RouteRecordRaw | null => {
      let found = null;
      for (let i = 0; i < _route.length; i += 1) {
        const element = _route[i];
        if (element.children) {
          found = travel(element.children, path);
        } else {
          found = element.path === path ? element : null;
        }
        if (found) break;
      }
      return found;
    };

    if (newRoute.matched[0].name === '$app') {
      const appRoutes = newRoute.matched[0].children;

      let found = null;
      let path = appRoutes.find((e) => e.name === newRoute.name)?.path ?? '';
      while (path) {
        found = travel(menuTree.value, path);
        if (found) break;
        path = path.substring(0, path.lastIndexOf('/'));
      }
      selectedKey.value = found ? [found.name as string] : [];
    } else {
      selectedKey.value = [];
    }
  }, true);
  onUnmounted(() => {
    removeRouteListener();
  });

  // select
  const router = useRouter();
  const goto = (item: RouteRecordRaw) => {
    router.push({
      name: item.name,
    });
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
    return travel(menuTree.value);
  };
</script>

<style lang="less" scoped></style>

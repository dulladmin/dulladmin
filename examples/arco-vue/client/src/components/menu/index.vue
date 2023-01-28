<template>
  <a-menu
    v-model:collapsed="collapsed"
    style="height: 100%; width: 100%"
    :show-collapse-button="collapseButtonHidden"
  >
    <renderFn />
  </a-menu>
</template>

<script lang="tsx" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter, RouteRecordRaw } from 'vue-router';
  import { useAppStore } from '@/store';
  import menuTree from './menu-tree';

  // i18n
  const { t } = useI18n();

  // store
  const appStore = useAppStore();

  // collapsed
  const collapsed = computed({
    get: () => (appStore.isMobile ? false : appStore.menuCollapse),
    set: (value: boolean) => appStore.changeMenuCollapse(value),
  });
  const collapseButtonHidden = computed(() => appStore.isMobile);

  // navigate
  const router = useRouter();
  const goto = (item: RouteRecordRaw) => {
    router.push({
      name: item.name,
    });
  };

  // render
  const renderFn = () => {
    const travel = (_route: RouteRecordRaw[], nodes = []) => {
      if (_route) {
        _route.forEach((element) => {
          const node = element.children ? (
            <a-sub-menu key={element.path} title={t(element.meta.title)}>
              {travel(element.children)}
            </a-sub-menu>
          ) : (
            <a-menu-item key={element.path} onClick={() => goto(element)}>
              {t(element.meta.title)}
            </a-menu-item>
          );
          nodes.push(node);
        });
      }
      return nodes;
    };
    return travel(menuTree);
  };
</script>

<style lang="less" scoped></style>

<template>
  <a-menu
    v-model:collapsed="menuCollapsed"
    show-collapse-button="collapseButtonHidden"
    style="height: 100%; width: 100%"
  ></a-menu>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore } from '@/store';

  const appStore = useAppStore();

  // menuCollapsed
  const menuCollapsed = computed({
    get: () => (appStore.isMobile ? false : appStore.menuCollapse),
    set: (value: boolean) => appStore.changeMenuCollapse(value),
  });
  const collapseButtonHidden = computed(() => appStore.isMobile);
</script>

<style lang="less" scoped></style>

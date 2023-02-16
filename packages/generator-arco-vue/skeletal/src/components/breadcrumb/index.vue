<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ $t(item) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue';
  import { RouteRecordRaw } from 'vue-router';
  import { appMenu, findAppMenuItem } from '@/router/app-menu';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';

  // breadcrumb
  const items = ref<string[]>([]);

  // breadcrumb - routeChanged
  listenerRouteChange((newRoute) => {
    if (newRoute.matched[0].name === '$app') {
      if (newRoute.name === '$app') return;

      const ancestors = findAppMenuItem(newRoute);
      items.value = ancestors.map((item) => item.meta?.title as string)
    } else {
      items.value = [];
    }
  }, true);
  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style lang="less" scoped>
  .breadcrumb {
    margin: 16px;

    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));

      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>

<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ $t(item) }}
    </a-breadcrumb-item>
    <template v-if="currentItem">
      <a-breadcrumb-item>
        {{ $t(currentItem.title) }}
        <span v-if="currentItem.id"> # {{ currentItem.id }} </span>
      </a-breadcrumb-item>
    </template>
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
  const currentItem = ref<Record<string, any> | null>(null);

  // breadcrumb - routeChange
  listenerRouteChange((newRoute) => {
    if (newRoute.matched[0].name === '$app') {
      if (newRoute.name === '$app') return;

      const ancestors = findAppMenuItem(newRoute);
      const item = ancestors[ancestors.length - 1];
      if (item == null) {
        items.value = [newRoute.meta?.title as string];
      } else {
        items.value = ancestors.map((_item) => _item.meta?.title as string);
      }

      if (item?.name !== newRoute.name) {
        currentItem.value = {
          title: newRoute.meta?.title,
          id: newRoute.params?.id,
        };
      } else {
        currentItem.value = null;
      }
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

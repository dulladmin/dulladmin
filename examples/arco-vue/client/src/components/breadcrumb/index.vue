<template>
  <div class="breadcrumb">
    <a-breadcrumb class="breadcrumb-menu">
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

    <a-button
      v-if="backPath"
      type="outline"
      shape="round"
      size="mini"
      @click="goto(backPath)"
    >
      {{ $t('breadcrumb.actions.back') }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onUnmounted } from 'vue';
  import { useRouter, RouteRecordRaw } from 'vue-router';
  import { isEqual } from 'lodash';
  import { usePermission } from '@/hooks';
  import { appRoutes } from '@/router';
  import { appMenu, findAppMenuItem } from '@/router/app-menu';
  import { useAppStore } from '@/store';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import type { RouteChangeEvent } from '@/utils/route-listener';

  // store
  const appStore = useAppStore();

  // breadcrumb
  const items = ref<string[]>([]);
  const currentItem = ref<Record<string, any> | null>(null);
  const backPath = ref<string | null>(null);

  // breadcrumb - routeChange
  const routeChangeHandler = (e: RouteChangeEvent) => {
    const { to } = e;
    if (to.matched[0].name === '$app') {
      if (to.name === '$app') return;

      const ancestors = findAppMenuItem(to);
      items.value = ancestors.map((_item) => _item.meta?.title as string);

      const item = ancestors[ancestors.length - 1];
      if (item?.name === to.name) {
        currentItem.value = null;
      } else {
        currentItem.value = {
          title: to.meta?.title,
          id: to.params?.id,
        };
      }

      const { back } = to.query;
      backPath.value = back as string;
    } else {
      items.value = [];
      currentItem.value = null;
      backPath.value = null;
    }
  };
  listenerRouteChange(routeChangeHandler, true);
  onUnmounted(() => removeRouteListener(routeChangeHandler));

  // breadcrumb - back
  const router = useRouter();
  const goto = (back: string | null) => {
    if (back) {
      appStore.removeCurrentActiveTab();
      router.replace({ path: back });
    }
  };
</script>

<style lang="less" scoped>
  .breadcrumb {
    display: flex;
    margin: 16px 20px;
  }

  .breadcrumb-menu {
    flex: 1;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>

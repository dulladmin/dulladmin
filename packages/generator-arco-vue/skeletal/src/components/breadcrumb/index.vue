<template>
  <div class="breadcrumb-wrap">
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

    <a-button
      v-if="currentItemIndexViewRoute"
      type="outline"
      shape="round"
      size="mini"
      @click="goto(currentItemIndexViewRoute!)"
    >
      {{ $t('breadcrumb.actions.backToIndexView') }}
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
  const currentItemIndexViewRoute = ref<RouteRecordRaw | null>(null);

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

      const nameComponents = to.meta.nameComponents ?? [];
      if (nameComponents[1] === 'Index') {
        currentItemIndexViewRoute.value = null;
      } else {
        const { accessRouter } = usePermission();
        currentItemIndexViewRoute.value =
          appRoutes.find((_route) => {
            return (
              accessRouter(_route) &&
              isEqual(_route.meta.nameComponents, [nameComponents[0], 'Index'])
            );
          }) ?? null;
      }
    } else {
      items.value = [];
      currentItem.value = null;
      currentItemIndexViewRoute.value = null;
    }
  };
  listenerRouteChange(routeChangeHandler, true);
  onUnmounted(() => removeRouteListener(routeChangeHandler));

  // breadcrumb - backTo
  const router = useRouter();
  const goto = (item: RouteRecordRaw) => {
    // switch to tab
    const tab = appStore.tabs.find((e) => e.name === item.name);
    if (tab) {
      appStore.removeCurrentActiveTab();
      router.replace({ ...tab });
      return;
    }

    // relace current tab
    appStore.removeCurrentActiveTab();
    router.replace({ name: item.name });
  };
</script>

<style lang="less" scoped>
  .breadcrumb-wrap {
    display: flex;
    margin: 16px 20px;
  }

  .breadcrumb {
    flex: 1;
    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));
      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>

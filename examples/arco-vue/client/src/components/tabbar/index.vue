<template>
  <div class="tabbar">
    <a-affix :offset-top="60">
      <div id="tabbar-box" class="tabbar-box">
        <div class="tabbar-scroll">
          <div class="tabbar-content">
            <TabBarItem
              v-for="(tab, index) in tabs"
              :key="tab.fullPath"
              :tab="tab"
              :tab-index="index"
            />
          </div>
        </div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted } from 'vue';
  import { useAppStore } from '@/store';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import type { RouteChangeEvent } from '@/utils/route-listener';
  import TabBarItem from './item.vue';

  // store
  const appStore = useAppStore();

  // tabs
  const tabs = computed(() => appStore.tabs);

  // tabs - add
  const routeChangeHandler = (e: RouteChangeEvent) => {
    const { to } = e;
    appStore.addTab(to);
  };
  listenerRouteChange(routeChangeHandler, true);
  onUnmounted(() => removeRouteListener(routeChangeHandler));
</script>

<style lang="less" scoped>
  .tabbar {
    position: relative;
    background-color: var(--color-bg-2);

    .tabbar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);

      .tabbar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;

        .tabbar-content {
          padding: 4px 0;
          height: 48px;
          white-space: nowrap;
          overflow-x: auto;

          :deep(.tabbar-item) {
            display: inline-flex;
            align-items: center;
            margin-right: 6px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

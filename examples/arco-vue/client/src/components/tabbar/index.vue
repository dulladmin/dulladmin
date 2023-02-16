<template>
  <div class="tabbar-container">
    <a-affix :offset-top="60">
      <div class="tabbar-box" id="tabbar-box">
        <div class="tabbar-scroll">
          <div class="tabbar-content">
            <TabBarItem
              v-for="(tab, index) in tabs"
              :key="tab.fullPath"
              :tab="tab"
              :tabIndex="index"
            />
          </div>
        </div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { useAppStore } from '@/store';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import TabBarItem from './item.vue';

  // store
  const appStore = useAppStore();

  // tabs
  const tabs = computed(() => appStore.tabs);

  // tabs - routeChange
  listenerRouteChange((route: RouteLocationNormalized) => {
    appStore.addTab(route);
  }, true);
  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style lang="less" scoped>
  .tabbar-container {
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

<template>
  <a-layout class="layout" :class="{ mobile: appStore.isMobile }">
    <div class="layout-navbar">
      <NavBar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!menuHidden"
          class="layout-sider"
          breakpoint="xl"
          :width="menuWidth"
          :style="{ paddingTop: '60px' }"
          :hide-trigger="true"
          :collapsible="true"
          :collapsed="appStore.menuCollapse"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-drawer
          v-if="menuHidden"
          placement="left"
          mask-closable
          :closable="false"
          :footer="false"
          :visible="drawerVisible"
          @cancel="drawerCancel"
        >
          <Menu />
        </a-drawer>
        <a-layout class="layout-content" :style="contentPaddingStyle">
          <a-layout-content>
            <TabBar />
            <Breadcrumb />
            <router-view v-slot="{ Component, route }">
              <transition name="fade" mode="out-in" appear>
                <keep-alive :include="cachedTabs" :exclude="cachedDisabledTabs">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </a-layout-content>
          <a-layout-footer>
            <Footer />
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { ref, computed, provide } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import { Breadcrumb, Footer, Menu, NavBar, TabBar } from '@/components';
  import { useResponsive } from '@/hooks';
  import { useAppStore } from '@/store';

  const appStore = useAppStore();
  useResponsive(true);

  // menu in sider
  const renderMenu = computed(() => !appStore.topMenu);
  const menuHidden = computed(() => appStore.isMobile);
  const menuWidth = computed(() => (appStore.menuCollapse ? 48 : 220));

  // menu in drawer
  const drawerVisible = ref(false);
  const drawerCancel = () => {
    drawerVisible.value = false;
  };
  provide('toggleDrawerMenu', () => {
    drawerVisible.value = !drawerVisible.value;
  });

  // tabbar
  const cachedTabs = computed(() => {
    return appStore.cachedTabs;
  });
  const cachedDisabledTabs = computed(() => {
    return Array.from(appStore.cachedDisabledTabs);
  });

  // content area
  const contentPaddingStyle = computed(() => {
    const paddingTop = { paddingTop: '60px' };
    const paddingLeft =
      renderMenu.value && !menuHidden.value
        ? { paddingLeft: `${menuWidth.value}px` }
        : {};
    return { ...paddingTop, ...paddingLeft };
  });
</script>

<style lang="less" scoped>
  @nav-size-height: 60px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;

    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }

  .layout-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>

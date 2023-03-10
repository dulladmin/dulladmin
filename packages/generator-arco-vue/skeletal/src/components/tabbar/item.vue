<template>
  <a-dropdown
    trigger="contextMenu"
    popup-container="#tabbar-box"
    :popup-max-height="false"
    @select="onDropdownActionSelect"
  >
    <span class="arco-tag arco-tag-size-medium arco-tag-checked tabbar-item">
      <span
        class="tabbar-item-link"
        :class="{
          'item-link-activated': tab.name === currentActiveTab?.name,
        }"
        @click="open()"
      >
        {{ $t(tab.meta.title as string) }}
      </span>
      <span
        class="arco-icon-hover arco-icon-hover-size-medium arco-tag-icon-hover tabbar-item-close-btn"
        @click.stop="close()"
      >
        <icon-close />
      </span>
    </span>
    <template #content>
      <a-doption
        :disabled="disabledReloadCurrent"
        :value="Action.ReloadCurrent"
      >
        <icon-refresh />
        <span>{{ $t('tabbar.actions.reloadCurrent') }}</span>
      </a-doption>
      <a-doption class="sperate-line" :value="Action.CloseCurrent">
        <icon-close />
        <span>{{ $t('tabbar.actions.closeCurrent') }}</span>
      </a-doption>
      <a-doption
        :disabled="disabledCloseCurrentToLeft"
        :value="Action.CloseCurrentToLeft"
      >
        <icon-to-left />
        <span>{{ $t('tabbar.actions.closeCurrentToLeft') }}</span>
      </a-doption>
      <a-doption
        class="sperate-line"
        :disabled="disabledCloseCurrentToRight"
        :value="Action.CloseCurrentToRight"
      >
        <icon-to-right />
        <span>{{ $t('tabbar.actions.closeCurrentToRight') }}</span>
      </a-doption>
      <a-doption :value="Action.CloseOthers">
        <icon-swap />
        <span>{{ $t('tabbar.actions.closeOthers') }}</span>
      </a-doption>
      <a-doption :value="Action.CloseAll">
        <icon-folder-delete />
        <span>{{ $t('tabbar.actions.closeAll') }}</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAppStore } from '@/store';
  import type { Tab } from '@/store/app';

  // types
  enum Action {
    ReloadCurrent = 'reloadCurrent',
    CloseCurrent = 'closeCurrent',
    CloseCurrentToLeft = 'closeCurrentToLeft',
    CloseCurrentToRight = 'closeCurrentToRight',
    CloseOthers = 'closeOthers',
    CloseAll = 'closeAll',
  }

  // props
  const props = defineProps<{
    tab: Tab;
    tabIndex: number;
  }>();

  // store
  const appStore = useAppStore();

  // tabs
  const tabs = computed(() => appStore.tabs);
  const currentActiveTab = computed(() => appStore.currentActiveTab);

  // tabs - disabled
  const disabledReloadCurrent = computed(() => {
    return props.tab.fullPath !== currentActiveTab.value?.fullPath;
  });
  const disabledCloseCurrentToLeft = computed(() => {
    return props.tabIndex === 0;
  });
  const disabledCloseCurrentToRight = computed(() => {
    return props.tabIndex === tabs.value.length - 1;
  });

  // tabs - open
  const router = useRouter();
  const open = () => {
    appStore.setNewTabOpenParams({ toTop: true });
    router.push({ ...props.tab });
  };

  // tabs - close
  const openAfterClose = (tab: Tab) => {
    appStore.setNewTabOpenParams({ toTop: true });
    router.push({ ...tab });
  };
  const close = () => {
    const nextTab = appStore.removeCurrentTab(props.tab, props.tabIndex);
    if (nextTab != null) openAfterClose({ ...nextTab });
  };

  // tabs - actionSelect
  const onDropdownActionSelect = async (value: any) => {
    let nextTab: Tab | null = null;

    switch (value as Action) {
      case Action.ReloadCurrent:
        router.replace({ query: { ...props.tab.query, _r: Date.now() } });
        break;
      case Action.CloseCurrent:
        nextTab = appStore.removeCurrentTab(props.tab, props.tabIndex);
        if (nextTab != null) openAfterClose({ ...nextTab });
        break;
      case Action.CloseCurrentToLeft:
        nextTab = appStore.removeCurrentTabToTheLeft(props.tab, props.tabIndex);
        if (nextTab != null) openAfterClose({ ...nextTab });
        break;
      case Action.CloseCurrentToRight:
        nextTab = appStore.removeCurrentTabToTheRight(
          props.tab,
          props.tabIndex
        );
        if (nextTab != null) openAfterClose({ ...nextTab });
        break;
      case Action.CloseOthers:
        nextTab = appStore.removeOtherTabs(props.tab);
        if (nextTab != null) openAfterClose({ ...nextTab });
        break;
      case Action.CloseAll:
        nextTab = appStore.removeAllTabs();
        if (nextTab != null) openAfterClose({ ...nextTab });
        break;
      default:
        break;
    }
  };
</script>

<style lang="less" scoped>
  .tabbar-item-link {
    color: var(--color-text-2);
    text-decoration: none;
    padding-right: 4px;
  }

  .item-link-activated {
    color: rgb(var(--link-6));
    .tabbar-item-link {
      color: rgb(var(--link-6));
    }
    & + .tabbar-item-close-btn {
      color: rgb(var(--link-6));
    }
  }

  .arco-dropdown-open {
    .tabbar-item-link {
      color: rgb(var(--danger-6));
    }
    .tabbar-item-close-btn {
      color: rgb(var(--danger-6));
    }
  }

  .sperate-line {
    border-bottom: 1px solid var(--color-neutral-3);
  }

  :deep(.arco-dropdown-option-content) {
    span {
      margin-left: 10px;
    }
  }
</style>

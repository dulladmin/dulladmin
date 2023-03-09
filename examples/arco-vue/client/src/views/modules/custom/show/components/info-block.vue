<!-- This file encapsulates the template, logic, and styling of a Vue component, -->
<!-- and will be imported in file ../index.vue. Feel free to edit it.            -->

<template>
  <div class="header">
    <a-space :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="store.avatar" />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ store.name }}
      </a-typography-title>
      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-user />
            <a-typography-text>{{ store.jobName }}</a-typography-text>
          </div>
          <div>
            <icon-home />
            <a-typography-text>
              {{ store.organizationName }}
            </a-typography-text>
          </div>
          <div>
            <icon-location />
            <a-typography-text>{{ store.locationName }}</a-typography-text>
          </div>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { get } from '@/api/modules/custom/show/info-block';
  import { useLoading, useTabbableViewBlock } from '@/hooks';

  // route
  const route = useRoute();
  const id = (route.params.id as string) ?? '';

  // store
  const { loading, setLoading } = useLoading(true);
  const store = ref<Record<string, any>>({
    name: 'John Doe',
    jobName: 'Developer',
    organizationName: 'DullAdmin',
    locationName: 'Earth',
    avatar: `https://picsum.photos/id/200/100`
  });
  const fetchStore = async () => {
    setLoading(true);
    try {
      // Uncomment the following to fetch data from server
      // const { data } = await get(id);
      // store.value = data;
    } finally {
      setLoading(false);
    }
  };

  // refresh
  const onRefresh = async () => {
    await fetchStore();
  };

  // Your code goes here
  //


  // tabbable
  useTabbableViewBlock({
    viewName: 'CustomShow',
    refreshFn: onRefresh,
  });

  // init
  onRefresh();
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--gray-10);
    background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
      no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }
    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }
      .arco-typography {
        margin-left: 6px;
      }
    }
  }
</style>

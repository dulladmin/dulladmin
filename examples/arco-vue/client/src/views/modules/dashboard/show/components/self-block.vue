<!-- This file encapsulates the template, logic, and styling of a Vue component, -->
<!-- and will be imported in file ../index.vue. Feel free to edit it.            -->

<template>
  <div>
    <a-card :title="$t('dashboard--show.self-block.title')" class="da-custom-block dac-self-block">
      <a-grid :cols="24">
        <a-grid-item :span="6">
          <a-statistic title="Downloads" :value="125670" show-group-separator />
        </a-grid-item>
        <a-grid-item :span="6">
          <a-statistic title="Comments" :value="40509" :precision="2" />
        </a-grid-item>
        <a-grid-item :span="6">
          <a-statistic title="New Users" :value="125670" show-group-separator >
            <template #suffix>
              <icon-arrow-rise />
            </template>
          </a-statistic>
        </a-grid-item>
        <a-grid-item :span="6">
          <a-statistic title="User Growth Rate" :value="50.52" :precision="2" :value-style="{ color: '#0fbf60' }">
            <template #prefix>
              <icon-arrow-rise />
            </template>
            <template #suffix>%</template>
          </a-statistic>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { get } from '@/api/modules/dashboard/show/self-block';
  import { useLoading, useTabbableViewBlock } from '@/hooks';

  // route
  const route = useRoute();
  const id = (route.params.id as string) ?? '';

  // store
  const { loading, setLoading } = useLoading(true);
  const store = ref<Record<string, any>>({});
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
    viewName: 'DashboardShow',
    refreshFn: onRefresh,
  });

  // init
  onRefresh();
</script>

<style lang="less" scoped>
</style>

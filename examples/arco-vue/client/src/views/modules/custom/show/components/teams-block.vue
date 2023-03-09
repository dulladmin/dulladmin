<!-- This file encapsulates the template, logic, and styling of a Vue component, -->
<!-- and will be imported in file ../index.vue. Feel free to edit it.            -->

<template>
  <div>
    <a-card :title="$t('custom--show.teams-block.title')" class="da-custom-block dac-teams-block">
      <a-spin style="display: block" :loading="loading">
        <a-list :bordered="false">
          <a-list-item
            v-for="team in store.teams"
            :key="team.id"
            action-layout="horizontal"
          >
            <a-list-item-meta :title="team.name">
              <template #avatar>
                <a-avatar>
                  <img :src="team.avatar" />
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-spin>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { get } from '@/api/modules/custom/show/teams-block';
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
      const { data } = await get(id);
      store.value = data;
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
</style>

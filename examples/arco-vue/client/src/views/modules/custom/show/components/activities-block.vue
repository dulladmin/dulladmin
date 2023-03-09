<!-- This file encapsulates the template, logic, and styling of a Vue component, -->
<!-- and will be imported in file ../index.vue. Feel free to edit it.            -->

<template>
  <div>
    <a-card :title="$t('custom--show.activities-block.title')" class="da-custom-block dac-activities-block">
      <a-list :bordered="false">
        <a-list-item
          v-for="activity in store.activities"
          :key="activity.id"
          action-layout="horizontal"
        >
          <a-skeleton
            v-if="loading"
            :loading="loading"
            :animation="true"
            class="skeleton-item"
          >
            <a-row :gutter="6">
              <a-col :span="2">
                <a-skeleton-shape shape="circle" />
              </a-col>
              <a-col :span="22">
                <a-skeleton-line :widths="['40%', '100%']" :rows="2" />
              </a-col>
            </a-row>
          </a-skeleton>
          <a-list-item-meta
            v-else
            :title="activity.title"
            :description="activity.description"
          >
            <template #avatar>
              <a-avatar>
                <img :src="activity.avatar" />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { get } from '@/api/modules/custom/show/activities-block';
  import { useLoading, useTabbableViewBlock } from '@/hooks';

  // route
  const route = useRoute();
  const id = (route.params.id as string) ?? '';

  // store
  const { loading, setLoading } = useLoading(true);
  const store = ref<Record<string, any>>({
    activities: new Array(7).fill(null).map((_item, index) => ({
      id: index,
      title: 'Hoodie locavore American Apparel etsy fap.',
      description: "Mcsweeney's organic American Apparel mlkshk keytar readymade party.",
      avatar: `https://picsum.photos/id/${400+index}/100`
    }))
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
</style>

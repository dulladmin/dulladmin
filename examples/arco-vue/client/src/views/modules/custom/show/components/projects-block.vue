<!-- This file encapsulates the template, logic, and styling of a Vue component, -->
<!-- and will be imported in file ../index.vue. Feel free to edit it.            -->

<template>
  <div>
    <a-card :title="$t('custom--show.projects-block.title')" class="da-custom-block dac-projects-block">
      <a-row :gutter="16">
        <a-col
          v-for="(project, index) in store.projects"
          :key="index"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="8"
          :xxl="8"
        >
        <a-card class="project-card">
            <a-skeleton v-if="loading" :loading="loading" :animation="true">
              <a-skeleton-line :rows="3" />
            </a-skeleton>
            <a-space v-else direction="vertical">
              <a-typography-text bold>{{ project.name }}</a-typography-text>
              <a-typography-text type="secondary">
                {{ project.description }}
              </a-typography-text>
              <a-space>
                <a-avatar-group :size="24">
                  {{ project.contributors }}
                  <a-avatar
                    v-for="(contributor, idx) in project.contributors"
                    :key="idx"
                    :size="32"
                  >
                    <img alt="avatar" :src="contributor.avatar" />
                  </a-avatar>
                </a-avatar-group>
              </a-space>
            </a-space>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { get } from '@/api/modules/custom/show/projects-block';
  import { useLoading, useTabbableViewBlock } from '@/hooks';

  // route
  const route = useRoute();
  const id = (route.params.id as string) ?? '';

  // store
  const { loading, setLoading } = useLoading(true);
  const store = ref<Record<string, any>>({ projects: Array(6).fill({}) });
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
  .project-card {
    height: 132px;
    margin-bottom: 20px;
  }
</style>

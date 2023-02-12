<template>
  <div class="arco-list-wrapper">
    <div class="arco-list arco-list-small arco-list-bordered arco-list-split">
      <div class="arco-list-content-wrapper">
        <div class="arco-list-content">
          <div v-for="(item, i) in data" :key="i" class="arco-list-item">
            <div class="arco-list-item-main">
              <div class="arco-list-item-content">
                <DullData :data="item" :meta="meta" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    data: any[];
    meta: Record<string, string>;
  }>();

  const data = computed(() => props.data);
  const meta = computed(() => props.meta);
</script>

<template>
  <div
    class="arco-descriptions arco-descriptions-size-small arco-descriptions-border"
  >
    <div class="arco-descriptions-body">
      <table class="arco-descriptions-table">
        <tbody>
          <tr
            v-for="(value, key, i) in data"
            :key="i"
            class="arco-descriptions-row"
          >
            <td
              class="arco-descriptions-item-label arco-descriptions-item-label-block"
            >
              {{ key }}
            </td>
            <td
              class="arco-descriptions-item-value arco-descriptions-item-value-block"
            >
              <SimpleData :data="value" :meta="meta[key]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import SimpleData from '@/components/renderer/data/simple_data.vue';

  const props = defineProps<{
    data: Record<string, any>;
    meta: Record<string, Record<string, string>>;
  }>();

  const data = computed(() => props.data);
  const meta = computed(() => props.meta);
</script>

<template>
  <div class="arco-table arco-table-size-small arco-table-border">
    <div class="arco-table-container">
      <div class="arco-table-content">
        <table class="arco-table-element">
          <thead>
            <tr class="arco-table-tr">
              <th
                v-for="(item, i) in tableColumns"
                :key="i"
                class="arco-table-th"
              >
                <span class="arco-table-cell arco-table-cell-align-left">
                  <span class="arco-table-th-title">
                    {{ item }}
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in tableData" :key="i" class="arco-table-tr">
              <td v-for="(subitem, j) in item" :key="j" class="arco-table-td">
                <span class="arco-table-cell arco-table-cell-align-left">
                  <span class="arco-table-td-content">
                    <SimpleData :data="subitem.data" :meta="subitem.meta" />
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import SimpleData from '@/components/renderer/data/simple_data.vue';

  const props = defineProps<{
    data: Record<string, any>[];
    meta: Record<string, Record<string, string>>;
  }>();

  const data = computed(() => props.data);
  const meta = computed(() => props.meta);

  const keys = computed(() => {
    return Object.keys(meta.value);
  });
  const tableColumns = computed(() => {
    return keys.value.map((k) => k);
  });
  const tableData = computed(() => {
    return data.value.map((item) => {
      return keys.value.map((k) => {
        return {
          data: item[k],
          meta: meta.value[k],
        };
      });
    });
  });
</script>

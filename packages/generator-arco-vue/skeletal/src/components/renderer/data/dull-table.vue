<!-- DataRenderer for Array<ObjectValue>, e.g. [{"id": 1}, {"id": 2}]. -->

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
                    {{ $t(meta.attributes[item]['i18nKey']) }}
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
                    <DullData :data="subitem.data" :meta="subitem.meta" />
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

  const props = defineProps<{
    data: Record<string, any>[];
    meta: Record<string, Record<string, any>>;
  }>();

  const data = computed(() => props.data);
  const meta = computed(() => props.meta);

  const keys = computed(() => {
    return Object.keys(meta.value.attributes);
  });
  const tableColumns = computed(() => {
    return keys.value.map((k) => k);
  });
  const tableData = computed(() => {
    return data.value.map((item) => {
      return keys.value.map((k) => {
        return {
          data: item[k],
          meta: meta.value.attributes[k],
        };
      });
    });
  });
</script>

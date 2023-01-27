<template>
  <div> {{ data }} </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps<{
    data: any;
    meta: Record<string, string>;
  }>();

  const data = computed(() => props.data);
</script>

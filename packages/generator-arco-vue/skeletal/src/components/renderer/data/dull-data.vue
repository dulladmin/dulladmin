<template>
  <div> {{ data }} </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps<{
    data: any;
    meta: Record<string, any>;
  }>();

  const data = computed(() => {
    if (props.meta.optionals?.[props.data]) {
      return t(props.meta.optionals[props.data].i18nKey);
    }
    return props.data;
  });
</script>

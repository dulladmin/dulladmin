<template>
  <div>
    <renderFn />
  </div>
</template>

<script lang="tsx" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ValueType } from '@/utils/metadata';

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

  const renderFn = () => {
    switch (props.meta.type as ValueType) {
      case ValueType.Double:
      case ValueType.Float:
      case ValueType.Int32:
      case ValueType.Int64:
      case ValueType.Uint32:
      case ValueType.Uint64:
      case ValueType.Sint32:
      case ValueType.Sint64:
      case ValueType.Fixed32:
      case ValueType.Fixed64:
      case ValueType.Sfixed32:
      case ValueType.Sfixed64:
        return <div>{ data.value }</div>;
      case ValueType.Bool:
        return <div>{ data.value }</div>;
      case ValueType.String:
        return <div>{ data.value }</div>;
      case ValueType.Datetime:
        return <div>{ data.value }</div>;
      case ValueType.Image:
        return <a-image src={ data.value } width="100" height="100" fit="contain"/>;
      case ValueType.Object:
      default:
        throw new Error(`Unknown value type \`${props.meta.type}\``);
    }
  };
</script>

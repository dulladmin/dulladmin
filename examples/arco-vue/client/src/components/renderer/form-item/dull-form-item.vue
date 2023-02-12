<template>
  <a-form-item :field="meta.name" :label="$t(meta.i18nKey)">
    <renderFn />
  </a-form-item>
</template>

<script lang="tsx" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ValueType } from '@/utils/metadata';

  const { t } = useI18n();

  const props = defineProps<{
    modelValue: any;
    meta: Record<string, any>;
  }>();
  const emits = defineEmits<{
    (e: 'update:modelValue', newValue: any): void;
  }>();

  const modelValue = computed({
    get() {
      return props.modelValue;
    },
    set(newModelValue) {
      emits('update:modelValue', newModelValue);
    },
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
        return <a-input v-model={modelValue.value} />;
      case ValueType.Bool:
        return <a-input v-model={modelValue.value} />;
      case ValueType.String:
      case ValueType.Datetime:
        return <a-input v-model={modelValue.value} />;
      case ValueType.Object:
      default:
        throw new Error(`Unknown value type \`${props.meta.type}\``);
    }
  };
</script>

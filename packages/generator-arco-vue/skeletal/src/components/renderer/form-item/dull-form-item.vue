<template>
  <a-form-item :field="meta.name" :label="$t(meta.i18nKey)">
    <renderFn />
  </a-form-item>
</template>

<script lang="tsx" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ValueType, val2str, str2val } from '@/utils/metadata';

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
      if (props.meta.optionals) {
        return val2str(props.modelValue, props.meta);
      }
      return props.modelValue;
    },
    set(newModelValue) {
      if (props.meta.optionals) {
        emits('update:modelValue', str2val(newModelValue, props.meta));
      } else {
        emits('update:modelValue', newModelValue);
      }
    },
  });

  const modelValueOptions = computed(() => {
    if (props.meta.optionals) {
      return Object.entries(props.meta.optionals).map(([key, value]) => {
        return { label: t((value as Record<string, any>).i18nKey), value: key };
      });
    }
    return [];
  });

  const renderFn = () => {
    if (props.meta.optionals) {
      return (
        <a-select
          v-model={modelValue.value}
          options={modelValueOptions.value}
          allow-clear
        />
      );
    }

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
        return <a-input-number v-model={modelValue.value} />;
      case ValueType.Bool:
        return <a-switch v-model={modelValue.value} />;
      case ValueType.String:
        return <a-input v-model={modelValue.value} />;
      case ValueType.Datetime:
        return <a-input v-model={modelValue.value} />;
      case ValueType.Object:
      default:
        throw new Error(`Unknown value type \`${props.meta.type}\``);
    }
  };
</script>

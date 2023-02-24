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

  const COLORS = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
  ];
  const renderFn = () => {
    if (props.meta.optionals) {
      let value: string | null = null;
      if (props.meta.optionals[props.data]) {
        value = t(props.meta.optionals[props.data].i18nKey);
      } else {
        value = String(props.data);
      }
      let colorIndex = -1;
      let color = 'gray';
      switch (props.meta.type as ValueType) {
        case ValueType.Bool:
          color = props.data ? 'green' : 'orange';
          break;
        default:
          colorIndex = Object.keys(props.meta.optionals).indexOf(props.data);
          color =
            colorIndex === -1 ? 'gray' : COLORS[colorIndex % COLORS.length];
          break;
      }
      return <a-tag color={color}>{value}</a-tag>;
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
        return <div>{props.data}</div>;
      case ValueType.Bool:
        return (
          <a-tag color={props.data ? 'green' : 'orange'}>
            {String(props.data)}
          </a-tag>
        );
      case ValueType.String:
        return <div>{props.data}</div>;
      case ValueType.Datetime:
        return <div>{props.data}</div>;
      case ValueType.Image:
        return (
          <a-image src={props.data} width="80" height="80" fit="contain" />
        );
      default:
        throw new Error(`Unknown value type \`${props.meta.type}\``);
    }
  };
</script>

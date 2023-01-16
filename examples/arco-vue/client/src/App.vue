<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { useLocale } from '@/hooks';

  const { currentLocale } = useLocale();

  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'en-US':
        return enUS;
      case 'zh-CN':
        return zhCN;
      default:
        return enUS;
    }
  });
</script>

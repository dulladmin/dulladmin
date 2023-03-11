<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useLocale } from '@/hooks';
  import { arcoMessages } from '@/locale';

  const { currentLocale } = useLocale();
  const locale = computed(() => arcoMessages(currentLocale.value));
</script>

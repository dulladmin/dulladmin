<template>
  <div class="content">
    <a-result
      class="result"
      status="404"
      :subtitle="$t('not-found.descriptions.title')"
    >
    </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back">
        {{ $t('not-found.descriptions.back') }}
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const back = () => {
    router.push({ name: '$app' });
  };
</script>

<style lang="less" scoped>
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -121px;
    text-align: center;
  }
</style>

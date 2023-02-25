<template>
  <a-layout class="container">
    <a-layout-content class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
    </a-layout-content>
    <a-layout-footer>
      <Footer />
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
  import { Footer } from '@/components';
  import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;
    background: var(--color-neutral-2);

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
  }
</style>

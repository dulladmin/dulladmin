<template>
  <div class="footer">
    Copyright © 2023-present
    <a
      class="arco-link"
      href="https://github.com/dulladmin/dulladmin"
      target="_blank"
      >DullAdmin</a
    >. All rights reserved.
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    margin: 20px 0 0 0;
    padding: 12px 20px 12px 24px;
    background-color: var(--color-bg-2);
    color: var(--color-text-2);
    font-weight: bold;

    :deep(.arco-link) {
      padding: 0;
      &:hover {
        background-color: var(--color-bg-2);
      }
    }
  }
</style>

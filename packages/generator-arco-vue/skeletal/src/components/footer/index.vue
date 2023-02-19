<template>
  <div class="footer">
    {{ $t('footer.copyright') }} &copy; {{ $t('footer.date') }}
    <a class="arco-link" target="_blank" :href="$t('site.author.url')">{{
      $t('site.author')
    }}</a
    >. {{ $t('footer.allRightsReserved') }}.
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

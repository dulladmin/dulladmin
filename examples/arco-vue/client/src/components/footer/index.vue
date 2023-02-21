<template>
  <div class="footer">
    <div style="flex: 1">
      {{ $t('footer.copyright') }} &copy; {{ $t('footer.copyright.date') }}
      <a class="arco-link" target="_blank" :href="$t('site.author.url')">{{
        $t('site.author')
      }}</a
      >. {{ $t('footer.allRightsReserved') }}.
    </div>
    <div>
      Powered by
      <a
        class="arco-link"
        target="_blank"
        href="https://github.com/dulladmin/dulladmin"
      >
        DullAdmin
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .footer {
    display: flex;
    margin: 20px 0 0 0;
    padding: 12px 24px 12px 24px;
    background-color: var(--color-bg-2);
    color: var(--color-text-2);
    font-weight: bold;
    font-size: 12px;

    :deep(.arco-link) {
      padding: 0;
      color: var(--color-text-2);
      font-size: 12px;
      &:hover {
        background-color: var(--color-bg-2);
      }
    }
  }
</style>

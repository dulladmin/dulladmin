<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-message">{{ errorMessage }}</div>
    <a-form
      class="login-form"
      layout="vertical"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        hide-label
        :rules="[
          {
            required: true,
            message: $t('login.form.username.presence.message'),
          },
        ]"
        :validate-trigger="['change']"
      >
        <a-input
          v-model="form.username"
          :placeholder="$t('login.form.username.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        hide-label
        :rules="[
          {
            required: true,
            message: $t('login.form.password.presence.message'),
          },
        ]"
        :validate-trigger="['change']"
      >
        <a-input-password
          v-model="form.password"
          allow-clear
          :placeholder="$t('login.form.password.placeholder')"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space direction="vertical" :size="16">
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useLoading } from '@/hooks';
  import { useUserStore } from '@/store';
  import type { CreateRequestForm as AuthCreateRequestForm } from '@/api/auth';

  const router = useRouter();
  const { t } = useI18n();

  const { loading, setLoading } = useLoading();
  const errorMessage = ref('');
  const form = reactive({
    username: '',
    password: '',
  });

  const userStore = useUserStore();
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (errors) return;

    setLoading(true);
    try {
      await userStore.login(values as AuthCreateRequestForm);
      Message.success(t('messagebox.login.success'));

      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      router.push({
        path: (redirect as string) || '/',
        query: {
          ...othersQuery,
        },
      });
    } catch (err) {
      errorMessage.value = (err as Error).message;
    } finally {
      setLoading(false);
    }
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }

    &-error-message {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
      text-align: center;
    }
  }
</style>

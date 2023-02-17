import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';

export default function useUser() {
  const router = useRouter();
  const userStore = useUserStore();
  const { t } = useI18n();

  const logout = async () => {
    await userStore.logout();
    Message.success(t('auth.logout.success'));

    const currentRoute = router.currentRoute.value;
    router.push({
      name: '$login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.path as string,
      },
    });
  };

  return {
    logout,
  };
}

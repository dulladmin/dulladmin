import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();

  const accessRouter = (route: RouteLocationNormalized | RouteRecordRaw) => {
    return (
      !route.meta?.roles ||
      route.meta?.roles?.includes('*') ||
      route.meta?.roles?.includes(userStore.info.role)
    );
  };

  return {
    accessRouter,
  };
}

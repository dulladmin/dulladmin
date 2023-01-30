import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

export default function usePermission() {
  const userStore = useUserStore();

  const accessRouter = (route: RouteLocationNormalized | RouteRecordRaw) => {
    return (
      !route.meta?.authority ||
      route.meta?.authority?.includes('*') ||
      route.meta?.authority?.includes(userStore.info.role)
    );
  };

  return {
    accessRouter,
  };
}

import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useAppStore } from '@/store';
import { addEventListen, removeEventListen } from '@/utils/event';

// @/assets/style/breakpoint.less
const WIDTH = 992;

export default function useResponsive(immediate?: boolean) {
  const appStore = useAppStore();

  function resizeHandler() {
    if (!document.hidden) {
      const rect = document.body.getBoundingClientRect();
      const isMobile = rect.width - 1 < WIDTH;
      appStore.changeDevice(isMobile ? 'mobile' : 'desktop');
    }
  }

  const debounceFn = useDebounceFn(resizeHandler, 100);
  onMounted(() => {
    if (immediate) debounceFn();
  });

  onBeforeMount(() => {
    addEventListen(window, 'resize', debounceFn);
  });

  onBeforeUnmount(() => {
    removeEventListen(window, 'resize', debounceFn);
  });
}

import {
  inject,
  provide,
  ref,
  watch,
  onActivated,
  onDeactivated,
  Ref,
} from 'vue';
import { useAppStore } from '@/store';

export function useTabbableView({ name }: { name: string }) {
  const appStore = useAppStore();

  // scrollPosition
  const scrollPosition = ref(0);
  const saveScrollPosition = () => {
    scrollPosition.value = document.documentElement.scrollTop;
  };
  const restoreScrollPosition = () => {
    document.documentElement.scrollTop = scrollPosition.value;
  };

  // refreshCurrentView
  const refreshCurrentView = ref(false);
  const setRefreshCurrentView = (val: boolean) => {
    refreshCurrentView.value = val;
  };
  provide(`${name}.REFRESH_CURRENT_VIEW`, refreshCurrentView);

  // tab - activated
  onActivated(() => {
    restoreScrollPosition();

    if (appStore.newTabOpenParams.refresh) setRefreshCurrentView(true);
    appStore.setNewTabOpenParams({});
  });

  // tab - deactivated
  onDeactivated(() => {
    saveScrollPosition();
    setRefreshCurrentView(false);
  });
}

export function useTabbableViewBlock({
  viewName,
  refreshFn,
}: {
  viewName: string;
  refreshFn: () => void;
}) {
  const refreshCurrentView = inject(
    `${viewName}.REFRESH_CURRENT_VIEW`
  ) as Ref<boolean>;
  watch(
    () => refreshCurrentView.value,
    (val) => {
      if (val) refreshFn();
    }
  );
}

import { onActivated, onDeactivated } from 'vue';

export default function useScrollBehavior() {
  let savedPosition = 0;

  onActivated(() => {
    document.documentElement.scrollTop = savedPosition;
  });

  onDeactivated(() => {
    savedPosition = document.documentElement.scrollTop;
  });
}

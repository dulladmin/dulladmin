import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;

  const userStore = useUserStore();
  const { role } = userStore.info;

  if (Array.isArray(value)) {
    if (!value.includes(role) && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};

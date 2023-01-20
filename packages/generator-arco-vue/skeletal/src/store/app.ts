import { ref } from 'vue';
import { defineStore } from 'pinia';

const useAppStore = defineStore('app', () => {
  const device = ref<string>('desktop');
  const theme = ref<string>('light');
  const menuCollapse = ref<boolean>(false);

  const changeDevice = (dev: string) => {
    device.value = dev;
  };

  const changeTheme = (dark: boolean) => {
    if (dark) {
      theme.value = 'dark';
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      theme.value = 'light';
      document.body.removeAttribute('arco-theme');
    }
  };

  const changeMenuCollapse = (collapse: boolean) => {
    menuCollapse.value = collapse;
  };

  return {
    device,
    changeDevice,

    theme,
    changeTheme,

    menuCollapse,
    changeMenuCollapse,
  };
});

export default useAppStore;

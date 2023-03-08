import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import 'echarts';
import router from '@/router';
import store from '@/store';
import i18n from '@/locale';
import directive from '@/directive';
import renderer from '@/components/renderer';
import App from '@/App.vue';
import '@/api/interceptor';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/main.less';

import.meta.glob('@/assets/style/modules/*.less', { eager: true });

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(directive);
app.use(renderer);

app.mount('#app');

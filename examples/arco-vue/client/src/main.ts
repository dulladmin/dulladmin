import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from '@/router';
import store from '@/store';
import i18n from '@/locale';
import App from '@/App.vue';
import DullData from '@/components/renderer/data/dull-data.vue';
import DullList from '@/components/renderer/data/dull-list.vue';
import DullDescriptions from '@/components/renderer/data/dull-descriptions.vue';
import DullTable from '@/components/renderer/data/dull-table.vue';
import DullFormItem from '@/components/renderer/form-item/dull-form-item.vue';
import '@/api/interceptor';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/main.less';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);

app.component('DullData', DullData);
app.component('DullList', DullList);
app.component('DullDescriptions', DullDescriptions);
app.component('DullTable', DullTable);
app.component('DullFormItem', DullFormItem);

app.mount('#app');

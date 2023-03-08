import { App } from 'vue';
import DullData from './data/dull-data.vue';
import DullList from './data/dull-list.vue';
import DullDescriptions from './data/dull-descriptions.vue';
import DullTable from './data/dull-table.vue';
import DullFormItem from './form-item/dull-form-item.vue';

export default {
  install(Vue: App) {
    Vue.component('DullData', DullData);
    Vue.component('DullList', DullList);
    Vue.component('DullDescriptions', DullDescriptions);
    Vue.component('DullTable', DullTable);
    Vue.component('DullFormItem', DullFormItem);
  },
};

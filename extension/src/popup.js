import 'webextension-polyfill';

import Vue from 'vue/dist/vue.esm.browser';
import Popup from './components/Popup.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Popup),
}).$mount('#app');

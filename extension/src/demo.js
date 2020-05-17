import Vue from 'vue/dist/vue.esm.browser';
import Demo from './components/Demo.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(Demo),
}).$mount('#app');

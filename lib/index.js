import Noodle from './Noodle.vue';
import NoodlePreview from './NoodlePreview.vue';

export { Noodle, NoodlePreview };

export function install(Vue) {
  Vue.component('Noodle', Noodle);
  Vue.component('NoodlePreview', NoodlePreview);
}

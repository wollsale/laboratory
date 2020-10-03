import './firebase';
import Vue from 'vue'
import App from './App.vue'
import * as VueFire from 'vuefire';
import { rtdbPlugin } from 'vuefire'

Vue.use(VueFire);
Vue.use(rtdbPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
})

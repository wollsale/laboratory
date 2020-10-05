import './firebase'
import Vue from 'vue'
import * as VueFire from 'vuefire'
import { rtdbPlugin } from 'vuefire'

import App from './App.vue'
import Feed from './views/Feed'
import AddNewPost from './views/AddNewPost'
import Post from './views/Post'
import VueRouter from 'vue-router'

Vue.use(VueFire);
Vue.use(rtdbPlugin);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Feed },
    { path: '/addNewPost', component: AddNewPost },
    {
      path: '/feed/:id',
      name: 'post',
      component: Post,
      props: true,
    }
  ]
});

Vue.filter('reverse', function (value) {
  return value.slice().reverse();
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router/index'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueResource); // 一定要放在这里
Vue.use(VueScrollTo);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  if (blocks.length === 0) return;
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

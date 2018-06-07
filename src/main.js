import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router/index'

Vue.use(VueResource); // 一定要放在这里

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

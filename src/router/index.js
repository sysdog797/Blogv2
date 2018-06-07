import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index'

Vue.use(Router);

export default new Router({
    mode: 'history', //去掉地址栏vue-router自动添加的#
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }]
})
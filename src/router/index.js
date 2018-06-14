import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index'
import article from '../components/article/article'

Vue.use(Router);

export default new Router({
    mode: 'history', //去掉地址栏vue-router自动添加的#
    routes: [{
        path: '/',
        name: 'index',
        component: index
    },{
        path:'/article/:id',
        name: 'article',
        component: article
    }],
    scrollBehavior (to, from, savedPosition){
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/chart',
            name: 'Index',
            component: () => import(/* chart */ '../views/chart.vue')
        },
    ]
})
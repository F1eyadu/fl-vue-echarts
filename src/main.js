import Vue from 'vue'
import App from './app'
import router from './routes/router'
import Echarts from 'echarts'
import echarts from './components/echarts/index'
import lodash from 'lodash'
Vue.use(echarts.BarChart)
Vue.use(echarts.LineChart)
Vue.use(echarts.PieChart)
Vue.use(Echarts)
Vue.prototype._ = lodash
new Vue({
    router,
    render: h => h(App)
}).$mount("#app")

axios.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

router.beforeEach((to, from, next) => {
    
})

if(module.hot){
    module.hot.accept()
}
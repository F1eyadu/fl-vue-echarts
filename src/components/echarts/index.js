import BarChart from './barChart/barChart.vue'
import LineChart from './lineChart/lineChart.vue'
import PieChart from './pieChart/pieChart.vue'
BarChart.install = function (Vue) {
    Vue.component(BarChart.name, BarChart)
}

LineChart.install = function (Vue) {
    Vue.component(LineChart.name, LineChart)
}

PieChart.install = function(Vue) {
    Vue.component(PieChart.name, PieChart)
}

export default {
    BarChart,
    LineChart,
    PieChart
}
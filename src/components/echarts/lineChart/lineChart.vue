<script>
import baseChart from './../baseChart.vue'
import LineChart from './lineChart.ts'
/** 
 * 不支持瀑布图类型
 * chartData = {
 *    dimensions: [name: '', data: []]  x轴数据源
 *    measures: [{name: data}]  图表显示的数据源
 * }
 * 
 * settings = {
 *     titleConfig: {}        与setOption中的title同样配置
 *     legendConfig: {}       与setOption中的legend同样配置, data根据measures
 *     xAxisConfig: {}        与setOption中的xAxis同样配置
 *     XaxisLabelConfig: {}   xAxis的axisLabel, 两者都存在时, 后者会替换前者相同key
 *     yAxisConfig: {}        与setOption中的yAxis同样配置
 *     yAxisLabelType: ''     设置y轴显示的样式, 目前只支持默认值和百分比两者 可选项 '', 'percentage'
 *     percentage: Boolean    是否开启百分比模式
 *     stack: []              柱状图堆叠模式
 *     serierConfig: {}       与setOption中的series同样配置 data是measures的数据
 *     serierLabel: {}        series的label
 *     serierItemStyle: {}    series的itemStyle
 *     toolTipConfig: {}      与setOption中的tooltip同样配置
 *     smooth: Boolean        设置折线图是否是平滑
 *     step: Boolean          设置折线图阶梯效果
 *     areaStyle: {}          区域折线图
 *     
 * }
 * 
*/
export default {
    inheritAttrs: false,
    name: 'LineChart',
    extends: baseChart,
    props: {
        chartData: {
            type: Object,
            default: () => {}
        },
        settings: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {

        }
    },
    watch: {
        chartData: {
            handler() {
                this.init()
            },
            deep: true
        },
        settings: {
            handler() {
                this.init()
            },
            deep: true
        }
    },
    methods: {
        hasKeys(obj) {
            if(obj) {
                return Object.keys(obj).length > 0
            }
        },
        setOPtion() {
            return this.hasKeys(this.chartData) ? new LineChart(this.chartData, this.settings).init() : {}
        }
    }
}
</script>
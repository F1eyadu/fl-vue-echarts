<script>
import baseChart from './../baseChart.vue'
import PieChart from './pieChart.ts'
/** 
 * chartData = {
 *    dimensions: [name: '', data: []]  x轴数据源
 *    measures: [{name: data}]  图表显示的数据源
 * }
 * 
 * settings = {
 *     titleConfig: {}        与setOption中的title同样配置
 *     legendConfig: {}       与setOption中的legend同样配置, data根据measures
 *     gridConfig: {}         与setOption中的grid同样配置
 *     toolTipConfig: {}      与setOption中的tooltip同样配置
 *     seriseConfig: {}       与setOption中的series同样配置, type固定为pie, data由chartData获取
 * }
 * 
*/
export default {
    inheritAttrs: false,
    name: 'PieChart',
    extends: baseChart,
    props: {
        chartData: {
            type: [Object, Array]
        },
        settings: {
            type: [Object, Array]
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
            return this.hasKeys(this.chartData) ? new PieChart(this.chartData, this.settings).init() : {}
        }
    }
}
</script>
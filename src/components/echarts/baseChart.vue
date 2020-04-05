<template>
    <div>
        <div ref="container" :style="chartStyle"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    name: 'baseChart',
    inheritAttrs: false,
    data() {
        return {
            chart: null
        }
    },
    props: {
        chartWidth: {
            type: [String, Number],
            default: '100%'
        },
        chartHeight: {
            type: [String, Number],
            default: '500px'
        }
    },
    computed: {
        chartStyle() {
            return {
                'width': this.chartWidth,
                'height': this.chartHeight
            }
        }
    },
    mounted() {
        this.init()
        window.addEventListener('resize',_.throttle(this.chart.resize, 500))
    },
    methods: {
        init() {
            this.chart = echarts.init(this.$refs.container)
            this.chart.setOption(this.setOPtion())    
        },
        setOPtion() {}
    }
}
</script>
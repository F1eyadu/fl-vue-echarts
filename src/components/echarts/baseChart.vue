<template>
    <div>
        <div >
            <div v-if="show">
                <div ref="container" :style="chartStyle"></div>
            </div>
            <div v-if="!show" :style="chartStyle" class="noData_wrapper">
                <div :style="nodataImg" class="noData_img"></div>
                <div>{{des}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import nodata from '@src/images/noData.jpg'
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
            default: '400px'
        },
        chartData: {
            type: Object,
            default: () => {}
        },
        settings: {
            type: Object,
            default: () => {}
        },
        noDataImg: {
            type: String,
            default: nodata
        },
        des: {
            type: String,
            default: '暂无数据'
        }
    },
    computed: {
        chartStyle() {
            return {
                'width': this.chartWidth,
                'height': this.chartHeight
            }
        },
        show() {
            if(this.chartData) {
                return Object.keys(this.chartData).length > 0
            }else{
                return false
            }
        },
        nodataImg() {
            return {
                'background-image': `url(${this.noDataImg})`,
                'width': `calc(${this.chartWidth} - 40%)`,
                'height': `calc(${this.chartHeight} - 20%)`,
            }
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
    mounted() {
        this.init()
        if(this.chart) {
            window.addEventListener('resize',_.throttle(this.chart.resize, 500))
        }
    },
    methods: {
        init() {
            let _this = this
            this.$nextTick(() => {
                let dom = this.$refs.container
                if(dom) {
                    this.chart = echarts.init(dom)
                    this.chart.setOption(this.setOPtion())
                    if(this.chart._$handlers.click) {
                        this.chart._$handlers.click.length = 0;
                    };
                    this.chart.on('click', function(params) {
                        _this.$emit('handleClick', params)
                    })
                }
            })
        },
        setOPtion() {}
    }
}
</script>
<style lang="less" scoped>
.noData_wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    .noData_img{
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }
}
</style>
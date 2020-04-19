import { floorMun, getPercentVal} from './../utils'
import {cloneDeep} from 'lodash'
import {COLOR, GRID, TITLE, LEGEND, XAXIS, YAXIS, TOOLTIP, SERIESLABEL, ChartData, Config} from './../baseConfig'

export default class LineEchart implements Config{
    constructor(public chartData: ChartData, public settings: any) {

    }
    private setTitle() { // 配置title
        let {titleConfig} = this.settings
        if(titleConfig&&titleConfig.text) {
            TITLE.show = true
        }
        return Object.assign({},TITLE, titleConfig)
    }
    private setLegend() { // 配置legend
        let { measures } = this.chartData
        let { legendConfig } = this.settings
        return Object.assign({},LEGEND, legendConfig, {data: measures&&measures.map( item => item.name)})
    }
    private setGrid(){ // 配置布局
        let { gridConfig} = this.settings
        return Object.assign({},GRID, gridConfig)
    }
    private setTooltip() { // 配置tooltip
        let { toolTipConfig } = this.settings 
        TOOLTIP.axisPointer.type = 'line'
        return Object.assign({},TOOLTIP, toolTipConfig)
    }
    setXAxis() {
        let { dimensions } = this.chartData
        let { xAxisConfig} = this.settings
        let xAxis = Object.assign({},XAXIS, {'boundaryGap': false}, xAxisConfig, {data: dimensions&&dimensions.data})
        return xAxis
    }
    setYAxis() {
        let { yAxisConfig, yAxisLabelType} = this.settings
        let yAxis = Object.assign({},cloneDeep(YAXIS), yAxisConfig)
        if(yAxisLabelType&&yAxisLabelType === 'percentage') {
            yAxis.axisLabel.formatter = (value) => `${floorMun(value)}%`
        }
        return yAxis
    }
    setSeries() {
        let { measures } = cloneDeep(this.chartData)
        let { serierConfig, smooth = false, areaStyle, stack, percentage = false, step = false, serierLabel, serierItemStyle, serierLineStyle} = this.settings
        if (percentage&&measures.length > 0) {
            measures = getPercentVal(measures)
        }
        const hasLabel = serierLabel&&Object.keys(serierLabel).length > 0
        let result =  measures&&measures.map( (item) => {
            let seriesItem:any = {
                name: item.name,
                type: 'line',
                smooth,
                step,
                data: item.data,
                stack: stack&&Array.isArray(stack)&&stack.includes(item.name) ? 'sum': '',
            }
            if(areaStyle) {
                seriesItem.areaStyle = areaStyle
            }
            if(hasLabel) {
                seriesItem.label = Object.assign({},SERIESLABEL, serierLabel)
            }
            return Object.assign({},serierConfig, {'itemStyle': serierItemStyle}, {'lineStyle': serierLineStyle}, seriesItem)
        })
        return result
    }
    init() {
        var option = {
            title: this.setTitle(),
            grid: this.setGrid(),
            color: COLOR,
            legend: this.setLegend(),
            tooltip: this.setTooltip(),
            xAxis: this.setXAxis(),
            yAxis: this.setYAxis(),
            series: this.setSeries()
        }
        return option
    }
}

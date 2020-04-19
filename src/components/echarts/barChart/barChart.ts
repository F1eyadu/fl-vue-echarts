import { floorMun, getPercentVal} from './../utils'
import {cloneDeep} from 'lodash'
import {COLOR, GRID, TITLE, LEGEND, XAXIS, YAXIS, TOOLTIP, SERIESLABEL, DATAZOOM, Dimensions, ChartData, Config} from './../baseConfig'

const yAxis = (data = [], secondMeaAxis = '', yAxisLabelType = [], yAxisConfig = {}, direction = '', dimensions:Dimensions, percentage: boolean = false) => {
    let yAxisarr = [data[0]]
    if(secondMeaAxis) { // 如果要显示两条Y轴
        let result = data.find(item => item.name == secondMeaAxis)
        if(result) yAxisarr.push(result)
    }
    return yAxisarr.map((val, index) => {
        let cloneYaxis = cloneDeep(YAXIS)
        if(yAxisLabelType && yAxisLabelType[index] == 'percentage' || (percentage&&direction != 'row')) {
            cloneYaxis.axisLabel.formatter = (value) => `${floorMun(value)}%`
        }
        let yAxis = Object.assign({},cloneYaxis, yAxisConfig)
        if(direction == 'row') {
            yAxis.data = dimensions.data
            yAxis.type = 'category'
        }
        return yAxis
    })
}

export default class BarEchart implements Config {
    constructor(public chartData: ChartData, public settings: any) {

    }
    private setTitle() { // 配置标题, 样式通过settings中的titleConfig进行配置
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
    // 配置X轴
    // xAxisConfig是x轴的整个配置项, XaxisLabelConfig是x轴文字的配置
    // 若XaxisLabelConfig存在, 会替换xAxisConfig相同的key
    private setXAxis() {
        let { dimensions } = this.chartData
        let { xAxisConfig, XaxisLabelConfig, direction, percentage = false } = this.settings
        //xAxisConfig = Object.assign({}, xAxisConfig)
        let xAxis = Object.assign({},XAXIS, xAxisConfig)
        if(XaxisLabelConfig&&Object.keys(XaxisLabelConfig).length > 0) { // axisLabel对应的配置项存在且有值会替换到默认配置的相同key
            xAxis = Object.assign({},XAXIS, { axisLabel: XaxisLabelConfig})
        }
        if(direction != 'row') {
            xAxis.data = dimensions&&dimensions.data
        }else{
            xAxis.type = 'value'
            if(percentage) {
                xAxis.axisLabel.formatter = (value) => `${floorMun(value)}%`
            }
        }

        return xAxis
    }
    private setYAxis() { //配置Y轴
        let { yAxisConfig, yAxisLabelType, secondMeaAxis, direction, percentage} = this.settings
        let { measures, dimensions } = this.chartData
        let result = yAxis(measures, secondMeaAxis, yAxisLabelType, yAxisConfig, direction,dimensions, percentage)
        return result
    }
    private setTooltip() { // 配置tooltip
        let { toolTipConfig } = this.settings 
        return Object.assign({},TOOLTIP, toolTipConfig)
    }
    private setSeries() { // 配置数据源
        let { measures } = cloneDeep(this.chartData)
        let {secondMeaAxis, showLine, serierLabel, serierConfig, serierItemStyle, stack, percentage} = this.settings
        if (percentage&&measures.length > 0) { 
            measures = getPercentVal(measures)
        }
        const hasLabel = serierLabel&&Object.keys(serierLabel).length > 0
        let result =  measures&&measures.map( (item) => {
            let seriesItem:any = {
                name: item.name,
                type:  showLine&&showLine.includes(item.name)? 'line': 'bar',
                data: item.data,
                stack: stack&&Array.isArray(stack)&&stack.includes(item.name) ? 'sum': '',
                barWidth: serierConfig&&serierConfig.barWidth || 24
            }
            if(secondMeaAxis) {
                seriesItem.yAxisIndex = item.name == secondMeaAxis ? 1: 0
            }
            if(hasLabel) {
                seriesItem.label = Object.assign({},SERIESLABEL, serierLabel)
            }
            return Object.assign({},serierConfig, {'itemStyle': serierItemStyle}, seriesItem)
        })
        return result
    }
    private setDataZoom() {
        let {dataZoomConfig} = this.settings
        return Object.assign({}, DATAZOOM, dataZoomConfig)
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
            dataZoom: this.setDataZoom(),
            series: this.setSeries()
        }
        return option
    }
}
import {cloneDeep} from 'lodash'
import {COLOR, GRID, TITLE, LEGEND,TOOLTIP, ChartData} from './../baseConfig'
export default class PieChart {
    // 如果chartData为Array, settings也应该为Array, settings中的配置只需要在第一项中配置
    constructor(public chartData: ChartData | ChartData[], public settings: any) {

    }
    private setTitle() { // 配置标题
        let titleConfig
        if(Array.isArray(this.chartData)) {
            let [first] = this.settings
            titleConfig = first&&first.titleConfig
        }else {
            titleConfig = this.settings.titleConfig
        }
        if(titleConfig&&titleConfig.text) {
            TITLE.show = true
        }
        return Object.assign({},TITLE, titleConfig)
    }
    private setLegend() { // 配置legend
        let lengedData = [], legendConfig
        if(Array.isArray(this.chartData)){
            for(let f of this.chartData) {
                if(f.dimensions&&f.dimensions.data) {
                    lengedData = lengedData.concat(f.dimensions.data) 
                }
            }
            let [first] = this.settings
            legendConfig = first&&first.legendConfig
            lengedData = Array.from(new Set(lengedData))
        }else {
            lengedData = this.chartData.dimensions.data
            legendConfig  = this.settings.legendConfig
        }
        return Object.assign({},LEGEND, legendConfig, {data: lengedData})
    }
    private setGrid(){ // 配置布局
        let gridConfig
        if(Array.isArray(this.chartData)) {
            let [first] = this.settings
            gridConfig = first&&first.gridConfig
        }else {
            gridConfig = this.settings.gridConfig
        }
        return Object.assign({},GRID, gridConfig)
    }
    private setTooltip() { // 配置tooltip
        let toolTipConfig
        if(Array.isArray(this.chartData)) {
            let [first] = this.settings
            toolTipConfig = first&&first.toolTipConfig
        }else {
            toolTipConfig = this.settings.toolTipConfig
        }
        TOOLTIP.trigger = 'item'
        TOOLTIP.formatter = (params) => {
            let {seriesName, marker, name, value} = params
            return `${seriesName}<br/>${marker} ${name}:  ${value}`
        }
        return Object.assign({},TOOLTIP, toolTipConfig)
    }
    private setSeries() {
        let result
        let measures = []
        let chartData = cloneDeep(this.chartData)
        if(Array.isArray(this.chartData)) {
            for(let i = 0; i < chartData.length; i++) {
                let {dimensions: {data: nameData}, measures: curMeasures } = chartData[i]
                let {seriseConfig} = this.settings[i]
                if(curMeasures.length > 0) {
                    curMeasures = curMeasures.map(child => {
                        child.data = child.data.map((val, index) => {
                            return {
                                name: nameData[index],
                                value: val
                            }
                        })
                        child.config = seriseConfig
                        return child
                    })
                }
                measures = measures.concat(...curMeasures)
            }
        }else{
            measures = chartData.measures
            let {data: nameData} = chartData.dimensions
            let {seriseConfig} = this.settings
            measures = measures.map(item => { // serier的data格式为[{name:'', value:''}]
                item.data = item.data.map((val, index) => {
                    return {
                        name: nameData[index],
                        value: val
                    }
                })
                item.config = seriseConfig
                return item
            })
        }
        result = measures.map( (item) => {
            return {
                center: ['40%', '50%'],
                ...item.config,
                name: item.name,
                type: 'pie',
                data: item.data
            }
        })
        return result
    }
    init() {
        let option = {
            title: this.setTitle(),
            grid: this.setGrid(),
            color: COLOR,
            legend: this.setLegend(),
            tooltip: this.setTooltip(),
            series: this.setSeries()
        }
        return option
    }
}
export const COLOR: string[] = [ // 基础颜色
    '#5282e4', '#40b17e', '#ffd600', '#f88d48', '#2ebce2',
    '#f35352', '#ce62d6', '#8954d4', '#5257b8', '#d42d6b'
]
export const GRID = { // grid基础设置
    right: 20,
    bottom: 10,
    left: 10,
    containLabel: true
} 

export const TITLE = {
    show: false,
    text: '',
    left: 'center',
    top: 'top'
}

export const LEGEND = {
    show: true,
    left: 'right',
    top: 'top'
}

export const XAXIS = {
    type: 'category',
    axisTick: {show: false},
    axisLabel: {    
        interval: 'auto',
        formatter: (value) => value
    }
}

export const YAXIS = {
    type: 'value',
    axisTick: {show: false},
    axisLabel: {  
        show: true,  
        interval: 'auto',  
        formatter: (value) => value 
    }
}

export const TOOLTIP = {
    trigger: 'axis',
    axisPointer: {        
        type: 'shadow' 
    },
    formatter: (params) => {
        let [tar] = params
        let str = params.map( item => {
            return `${item.marker}${item.seriesName}：${(item.data)}`
        }).join('<br/>')
        return tar.name + '<br/>' +  str
    }
}

export const SERIESLABEL = {
    show: false,
    position: 'top',
    fontSize: 12
}

export const DATAZOOM = {
    type: 'slider',
    show: false,
    backgroundColor: 'transparent',
    dataBackground: {
        lineStyle: {
            width: 0
        },
        areaStyle: {
            color: 'transparent',
        }
    },
    fillerColor: 'linear-gradient(to bottom, #fff, red, #fff)',
    borderColor: 'transparent',
    handleSize: '20px',
    handleStyle: {
        color: '#000',
    },  
    handleIcon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
}

export interface Dimensions {
    name: string,
    data: (string | number | object)[]
}
export interface ChartData {
    dimensions: Dimensions,
    measures: Dimensions[]
}


export interface Config {
    chartData: ChartData,
    settings: object
}
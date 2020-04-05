# fl-echarts
=====
基于 Vue2.x 与 ECharts4.x 构建封装的组件库，用以解决繁杂的 ECharts 配置项以及数据转化带来的烦恼。生成一个 ECharts 图表时，用户只需关心 数据 与 配置项，甚至无需配置项，即可生成一个默认的图表，快捷、高效地构建图表。
目前只支持柱状图、折线图和饼图,有的功能还有待完善,后续完善其他类型图表.因为才写两天时间, 😂😂😂

安装(还没有提交到npm😔)
npm i fl-charts echarts -S

使用
安装完成后，即可使用 import 或 require 使用。

import Vue from 'vue'
import FlCharts from 'fl-charts'

Vue.use(FlCharts)

默认基本配置, 也可在settings中像平常配置echarts方式直接进行配置.

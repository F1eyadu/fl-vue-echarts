<template>
  <div>
    <pie-chart :chartData="chartData" :settings="chartSettings" @handleClick="getValue" :loadOption="loadOption"></pie-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {},
      chartSettings: {},
      loadOption: {
        text: '加载中...',
        color: '#ffff00',
        textColor: 'red',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      }
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      let {chartData} = await this.getData()
      this.chartData = chartData;
    },
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            chartData: {
              dimensions: {
                name: '渠道',
                data: ['APP', 'PC', 'M端', '微信', '手Q', '小程序']
              },
              measures: [{
                name: 'PV',
                data: [40000, 27800, 22000, 20200, 15600, 13600]
              }]
            }
          })
        },3000)
      })
    },
    getValue(params) {
      console.log(params)
    }
  }
};
</script>
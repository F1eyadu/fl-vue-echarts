<template>
  <div>
    <pie-chart :chartData="chartData" :settings="chartSettings" @handleClick="getValue" ref="barChart"></pie-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {},
      chartSettings: {}
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
<template>
  <div>
    <bar-chart :chartData="chartData" :settings="chartSettings" @handleClick="getValue"></bar-chart>
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
      this.chartData = {
        dimensions: {
          name: '渠道',
          data: ['APP', 'PC', 'M端', '微信', '手Q', '小程序']
        },
        measures: [{
          name: 'PV',
          data: [40000, 27800, 22000, 20200, 15600, 13600]
        }]
      }   
  },
  methods: {
    getValue(params) {
      console.log(params)
    }
  }
};
</script>
<template>
  <div>
    <pie-chart :chartData="chartData" :settings="chartSettings"></pie-chart>
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
      this.chartSettings = {
        seriseConfig: {
            selectedMode: 'single',
            radius: ['50%', '70%'],
            label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                fontSize: '24',
                fontWeight: 'bold'
                }
            }
            },
            labelLine: {
            normal: {
                show: false
            }
            },
            avoidLabelOverlap: false
        }
      }
        
  }
};
</script>
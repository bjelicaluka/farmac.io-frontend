<template>
  <div id="chart">
    <apexchart
      ref="realtimeChart"
      type="line"
      height="350"
      :options="chartOptions" 
      :series="series"
    />
  </div>
</template>

<script>
export default {
  props: {
    seriesData: {
      type: Array,
      default: () => []
    },
  },
  watch: {
    seriesData() {
      this.updateSeriesLine();
    },
  },
  data: () => {
    return {
      series: [{
          name: "Medicine Consumption",
          data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#fff', 'transparent'],
            opacity: 0.5
          },
        },
      },
    }
  },
  methods: {
    updateSeriesLine() {
      this.series[0].data = [...this.seriesData];
      this.$refs.realtimeChart.updateSeries([...this.series], false, true);
    },
  },
  mounted() {
    this.updateSeriesLine();
  }
}
</script>

<style>

</style>
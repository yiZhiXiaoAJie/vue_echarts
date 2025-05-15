<!--
 * @Author: 马世洁 mashijiezuishuai@outlook.com
 * @Date: 2025-05-12 11:18:56
 * @LastEditors: 马世洁 mashijiezuishuai@outlook.com
 * @LastEditTime: 2025-05-15 17:35:33
 * @FilePath: \vue_echarts\src\views\HomeView_optimized_v5.vue
 * @Description: Optimized for responsive design, top-down layout, no vertical scroll, top panel larger (approx 58vh).
-->
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import Gauge from '@/components/gauge.vue'
import chinaMap from '@/assets/china.json'

const categoryChartRef = ref<HTMLElement | null>(null)
const pieChartRef = ref<HTMLElement | null>(null)
const footerChartRef = ref<HTMLElement | null>(null)
const mapChartRef = ref<HTMLElement | null>(null)

let categoryChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null
let footerChart: echarts.ECharts | null = null
let mapChart: echarts.ECharts | null = null

const charts: { chart: echarts.ECharts | null }[] = []

const initCharts = () => {
  const commonAxisLabelStyle = {
    color: '#0df',
    fontSize: 'clamp(7px, 0.8vh, 9px)', // Further reduced for smaller bottom panel
  }
  const commonGridStyle = {
    left: '15%',
    right: '10%',
    bottom: '20%',
    top: '20%', // Adjusted for tighter space
    containLabel: true,
  }

  if (categoryChartRef.value) {
    categoryChart = echarts.init(categoryChartRef.value)
    categoryChart.setOption({
      backgroundColor: 'transparent',
      xAxis: {
        type: 'category',
        data: ['丁香', '满天星', '郁金香', '康乃馨', '梅花', '桔梗', '鸢尾花'],
        axisLine: { lineStyle: { color: '#0df' } },
        axisLabel: commonAxisLabelStyle,
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#0df' } },
        axisLabel: commonAxisLabelStyle,
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      },
      grid: commonGridStyle,
      series: [
        {
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
          barWidth: 'clamp(6px, 1.2vw, 10px)',
          itemStyle: {
            borderRadius: [3, 3, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#00ffe3' },
              { offset: 0.5, color: '#0bc2ff' },
              { offset: 1, color: '#005eff' },
            ]),
            shadowColor: '#00ffe3',
            shadowBlur: 8,
          },
        },
      ],
    })
    charts.push({ chart: categoryChart })
  }

  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
    pieChart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '60%'], // Adjusted radius for smaller space
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 5,
            borderColor: 'rgba(0,255,227,0.25)',
            borderWidth: 0.8,
            shadowBlur: 8,
            shadowColor: 'rgba(0,255,227,0.5)',
          },
          label: {
            show: true,
            position: 'outside',
            color: '#0df',
            fontSize: 'clamp(7px, 0.8vh, 9px)',
            formatter: '{b}\n{d}%',
          },
          labelLine: { show: true, length: 4, length2: 2, lineStyle: { color: '#0df' } },
          data: [
            { value: 1048, name: '玫瑰花' },
            { value: 735, name: '菊花' },
            { value: 580, name: '康乃馨' },
            { value: 484, name: '向日葵' },
            { value: 300, name: '牡丹' },
          ],
          color: [
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#00ffe3' },
              { offset: 1, color: '#005eff' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#0bc2ff' },
              { offset: 1, color: '#002bff' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#00cfff' },
              { offset: 1, color: '#004bff' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#11faff' },
              { offset: 1, color: '#0071ff' },
            ]),
            new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: '#3dd9ff' },
              { offset: 1, color: '#0038ff' },
            ]),
          ],
        },
      ],
    })
    charts.push({ chart: pieChart })
  }

  if (footerChartRef.value) {
    footerChart = echarts.init(footerChartRef.value)
    footerChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: '#0df' } },
        formatter: '{b}<br/>{a}: {c}',
      },
      legend: {
        top: '10%',
        left: 'center',
        textStyle: { color: '#0df', fontSize: 'clamp(8px, 1vh, 10px)' },
      },
      grid: commonGridStyle,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: { lineStyle: { color: '#0df' } },
        axisLabel: commonAxisLabelStyle,
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#0df' } },
        splitLine: { lineStyle: { color: 'rgba(0,255,227,0.08)' } },
        axisLabel: commonAxisLabelStyle,
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 3,
          itemStyle: {
            color: '#00ffe3',
            borderColor: '#0df',
            borderWidth: 0.8,
            shadowBlur: 5,
            shadowColor: 'rgba(0,255,227,0.6)',
          },
          lineStyle: {
            width: 1.2,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#00ffe3' },
              { offset: 1, color: '#007eff' },
            ]),
            shadowColor: 'rgba(0,255,227,0.4)',
            shadowBlur: 6,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0,255,227,0.25)' },
              { offset: 1, color: 'rgba(0,255,227,0)' },
            ]),
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    })
    charts.push({ chart: footerChart })
  }

  if (mapChartRef.value) {
    echarts.registerMap('china', chinaMap as any)
    mapChart = echarts.init(mapChartRef.value)

    const geoCoordMap: Record<string, [number, number]> = {
      北京: [116.405285, 39.904989],
      上海: [121.472644, 31.231706],
      广州: [113.280637, 23.125178],
      深圳: [114.057868, 22.543099],
      成都: [104.065735, 30.659462],
      杭州: [120.153576, 30.287459],
      西安: [108.948024, 34.263161],
      南京: [118.767413, 32.041544],
      重庆: [106.504962, 29.533155],
      天津: [117.190182, 39.125596],
      武汉: [114.298572, 30.584355],
      郑州: [113.665412, 34.757975],
      长沙: [112.982279, 28.19409],
      合肥: [117.283042, 31.86119],
      南昌: [115.892151, 28.676493],
      福州: [119.306239, 26.075302],
      济南: [117.000923, 36.675807],
      昆明: [102.712251, 25.040609],
      石家庄: [114.502461, 38.045474],
      哈尔滨: [126.642464, 45.756967],
    }

    const cityData = Object.entries(geoCoordMap).map(([name, coord]) => ({
      name,
      value: [...coord, Math.random() * 30 + 20], // 加点权重
    }))

    // 生成一些模拟线路（从北京、上海、广州出发）
    const hubs = ['北京', '上海', '广州']
    const linesData = Object.keys(geoCoordMap)
      .filter((city) => !hubs.includes(city))
      .flatMap((city) =>
        hubs.map((hub) => ({
          fromName: hub,
          toName: city,
          coords: [geoCoordMap[hub], geoCoordMap[city]],
        })),
      )

    mapChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params: any) =>
          params.name || `${params.data.fromName} → ${params.data.toName}`,
      },
      geo: {
        map: 'china',
        roam: true,
        label: { show: false, color: '#fff' },
        itemStyle: {
          areaColor: '#013c62',
          borderColor: '#00ffe3',
          borderWidth: 0.4,
        },
        emphasis: {
          itemStyle: {
            areaColor: '#00ffe3',
          },
        },
        aspectScale: 0.75,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
      },
      series: [
        {
          name: '城市点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: cityData,
          symbolSize: (val: any[]) => (val[2] || 15) / 2.5,
          itemStyle: {
            color: '#00ffff',
            shadowBlur: 6,
            shadowColor: '#00ffe3',
          },
        },
        {
          name: '连接线路',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 1,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.5,
            color: '#fff',
            symbolSize: 3,
          },
          lineStyle: {
            color: '#00ffff',
            width: 1,
            opacity: 0.6,
            curveness: 0.3,
          },
          data: linesData,
        },
      ],
    })

    charts.push({ chart: mapChart })
  }
}

const resizeCharts = () => {
  charts.forEach((c) => c.chart?.resize())
}

onMounted(async () => {
  await nextTick()
  initCharts()
  window.addEventListener('resize', resizeCharts)
})

onBeforeUnmount(() => {
  charts.forEach((c) => c.chart?.dispose())
  window.removeEventListener('resize', resizeCharts)
})

const list = ref([
  { name: '玫瑰', price: 189, sales: 963, stock: 35, available: true },
  { name: '百合', price: 115, sales: 83, stock: 144, available: false },
  { name: '康乃馨', price: 115, sales: 83, stock: 144, available: false },
  { name: '向日葵', price: 115, sales: 83, stock: 144, available: false },
  { name: '满天星', price: 115, sales: 83, stock: 144, available: false },
  { name: '郁金香', price: 115, sales: 83, stock: 144, available: false },
  { name: '马蹄莲', price: 115, sales: 83, stock: 144, available: false },
  { name: '桔梗', price: 115, sales: 83, stock: 144, available: false },
  { name: '风信子', price: 115, sales: 83, stock: 144, available: false },
  { name: '蓝盆花', price: 115, sales: 83, stock: 144, available: false },
  { name: '铃兰', price: 115, sales: 83, stock: 144, available: false },
  { name: '勿忘我', price: 115, sales: 83, stock: 144, available: false },
  { name: '紫罗兰', price: 115, sales: 83, stock: 144, available: false },
  { name: '鸢尾花', price: 115, sales: 83, stock: 144, available: false },
  { name: '海棠花', price: 115, sales: 83, stock: 144, available: false },
  { name: '丁香', price: 115, sales: 83, stock: 144, available: false },
  { name: '梅花', price: 115, sales: 83, stock: 144, available: false },
  { name: '玉兰', price: 115, sales: 83, stock: 144, available: false },
])
</script>

<template>
  <div class="box">
    <div class="top-panel">
      <Gauge />
      <Gauge />
      <Gauge />
      <Gauge />
    </div>
    <div class="bottom-panel">
      <div class="header-title">大屏可视化</div>
      <div class="main-content">
        <div class="main-left-column">
          <div class="chart-group">
            <div class="chart-container category-chart" ref="categoryChartRef"></div>
            <div class="chart-container pie-chart" ref="pieChartRef"></div>
          </div>
          <div class="chart-container footer-chart" ref="footerChartRef"></div>
        </div>
        <div class="main-center-column chart-container" ref="mapChartRef"></div>
        <div class="main-right-column">
          <div class="table-header">
            <div>商品名</div>
            <div>价格</div>
            <div>销量</div>
            <div>库存</div>
            <div>在售</div>
          </div>
          <div class="table-body">
            <Vue3SeamlessScroll  :list="list" :step="0.5" :hover="true" :limit-scroll-num="1">
              <template v-slot="{ data }">
                <div class="table-row">
                  <div>{{ data.name }}</div>
                  <div>{{ data.price }}</div>
                  <div>{{ data.sales }}</div>
                  <div>{{ data.stock }}</div>
                  <div>{{ data.available ? '是' : '否' }}</div>
                </div>
              </template>
            </Vue3SeamlessScroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0a192f;
  overflow: hidden;
  padding: clamp(1px, 0.3vh, 3px); // Minimal padding for the entire box
  box-sizing: border-box;
}

.top-panel {
  flex: 0 0 calc(65vh - clamp(2px, 0.6vh, 6px)); // Approx 58% of viewport height, accounting for box padding & own padding
  // Or use height: calc(58vh - clamp(2px, 0.6vh, 6px));
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(110px, 14vw, 170px), 1fr));
  gap: clamp(2px, 0.5vw, 6px);
  padding: clamp(2px, 0.5vh, 6px);
  background-image: url('@/assets/image/a16.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  box-sizing: border-box;
}

.bottom-panel {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-image: url('@/assets/image/a16.png');
  background-size: cover;
  background-position: center;
  padding: clamp(2px, 0.5vh, 6px) clamp(2px, 0.5vw, 6px);
  box-sizing: border-box;
  margin-top: clamp(1px, 0.3vh, 3px);
}

.header-title {
  flex: 0 0 auto;
  padding: clamp(3px, 0.6vh, 5px) 0;
  font-size: clamp(12px, 1.8vh, 18px);
  color: #fff;
  letter-spacing: 1px;
  background-image: url('@/assets/image/head.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-bottom: clamp(3px, 0.6vh, 5px);
  text-align: center;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(2px, 0.5vw, 5px);
  overflow: hidden;
}

.main-left-column,
.main-center-column,
.main-right-column {
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 229, 255, 0.18);
  padding: clamp(2px, 0.5vw, 5px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.main-left-column {
  flex: 1;
  gap: clamp(2px, 0.5vw, 5px);
}

.chart-group {
  display: flex;
  flex-direction: column;
  gap: clamp(2px, 0.5vw, 5px);
  flex: 1;
  overflow: hidden;
}

.chart-container {
  flex: 1;
  min-height: 60px; // Very reduced min-height for bottom panel charts
  background-image: url('@/assets/image/bgc.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

.main-center-column {
  flex: 1.2;
}

.main-right-column {
  flex: 1;
  color: #b0e7ff;
  display: flex;
  flex-direction: column;
}

.table-header {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: clamp(2px, 0.4vh, 4px) clamp(1px, 0.3vw, 3px);
  font-size: clamp(8px, 0.9vh, 10px);
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 229, 255, 0.15);
  background: linear-gradient(90deg, rgba(0, 229, 255, 0.02) 0%, rgba(0, 229, 255, 0.08) 100%);
  border-radius: 2px 2px 0 0;
  text-align: center;
  white-space: nowrap;
}

.table-body {
  flex-grow: 1;
  overflow: hidden;
  font-size: clamp(7px, 0.8vh, 9px);
}

.table-row {
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(5, 1fr);
  padding: clamp(3px, 0.5vh, 5px) clamp(1px, 0.3vw, 3px);
  line-height: 1.1;
  border-bottom: 1px solid rgba(0, 229, 255, 0.06);
  transition: background 0.3s ease;
  text-align: center;
  &:hover {
    background: rgba(0, 229, 255, 0.015);
  }
  div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (min-width: 768px) {
  .main-content {
    flex-direction: row;
  }
  .main-left-column {
    flex: 1;
  }
  .chart-group {
    flex-direction: row;
    .category-chart,
    .pie-chart {
      flex: 1;
    }
  }
  .main-center-column {
    flex: 1.2;
  }
  .main-right-column {
    flex: 1;
  }
}

:deep(.wl-scrroll) {
  height: 100% !important;
}
</style>

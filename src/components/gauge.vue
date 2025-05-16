<!--
 * @Author: 马世洁 mashijiezuishuai@outlook.com
 * @Date: 2025-05-12 11:33:43
 * @LastEditors: 马世洁 mashijiezuishuai@outlook.com
 * @LastEditTime: 2025-05-16 16:19:54
 * @FilePath: \vue_echarts\src\components\gauge.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import Vue3Odometer from 'vue3-odometer'
import 'odometer/themes/odometer-theme-default.css'

const container = ref<HTMLElement | null>(null)
const containerSize = ref(180) // Default, will be updated by parent or its own width
const dotCount = 90

const getDotStyle = (index: number) => {
  const angle = (index / dotCount) * 2 * Math.PI
  const safeContainerSize = containerSize.value || 180
  // Radius relative to the circle container's current size
  const r = safeContainerSize * 0.42 // Slightly larger radius for dots
  const center = safeContainerSize / 2
  const x = center + r * Math.cos(angle)
  const y = center + r * Math.sin(angle)
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
}

const value = ref(3)

const updateSize = () => {
  if (container.value) {
    // The circle container's size is primarily driven by its CSS width (e.g., clamp function)
    // and its aspect-ratio: 1/1. We read its clientWidth to set containerSize for JS calculations.
    containerSize.value = container.value.clientWidth
  }
}

onMounted(async () => {
  const num = (Math.random() * 2 + 1).toFixed(2)
  value.value = parseFloat(num)

  await nextTick()
  updateSize()

  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

const randomGroup = (index: number) => {
  const titles = ['A', 'B', 'C', 'D']
  const meats = ['高档红', '低级肉红', '上级肉红', '精品肉红']
  const groupItems = Array.from({ length: 2 }, () => ({
    name: meats[getRandomInt(0, meats.length - 1)],
    highlight: `${getRandomInt(1, 5)}×${getRandomInt(50, 200)}`,
    value: getRandomInt(50, 10000),
    level: 'B',
  }))
  return {
    title: `112-${titles[index % titles.length]}`,
    image: new URL('@/assets/image/demo1.png', import.meta.url).href,
    showImage: index < 2,
    items: groupItems,
  }
}

const tableData = ref(Array.from({ length: 3 }, (_, i) => randomGroup(i)))

const totalHighlight = computed(() => {
  return tableData.value
    .flatMap((group) => group.items)
    .reduce((sum, item) => {
      const [count, unit] = item.highlight.split('×').map(Number)
      return sum + count * unit
    }, 0)
})

const totalValue = computed(() => {
  return tableData.value
    .flatMap((group) => group.items)
    .reduce((sum, item) => {
      if (typeof item.value === 'number') return sum + item.value
      return sum
    }, 0)
})
</script>

<template>
  <div class="container-wrapper">
    <div class="circle-container" ref="container">
      <div v-for="n in dotCount" :key="n" class="dot" :style="getDotStyle(n)" />
      <div class="center-content">
        <div class="header-text">3993-B</div>
        <div class="row">
          <div>二</div>
          <div class="highlight">15708</div>
          <div>大丰花卉</div>
        </div>
        <div class="sub-text">2837-折射</div>
        <div class="row">
          <div>858-成熟度异</div>
          <div class="highlight">2度</div>
          <div>40</div>
        </div>
        <div class="row">
          <div>1</div>
          <div>×</div>
          <div class="highlight">140R</div>
        </div>
        <div class="row">
          <div>C</div>
          <Vue3Odometer class="o-text" :value="value" />
        </div>
      </div>
    </div>

    <div class="custom-table-wrapper">
      <div class="custom-table">
        <!-- <table>
          <tbody>
            <tr class="group-row">
              <td rowspan="2" class="img-cell">
                <img src="@/assets/image/demo1.png" alt="肉类" />
              </td>
              <td class="group-title">112-B</td>
              <td>高档红</td>
              <td class="highlight">2×100</td>
              <td>75</td>
              <td>B</td>
            </tr>
            <tr>
              <td></td>
              <td>低级肉红</td>
              <td class="highlight">7999</td>
              <td>2×126</td>
              <td></td>
            </tr>
            <tr class="group-row">
              <td rowspan="2"></td>
              <td class="group-title">112-C</td>
              <td>高档红</td>
              <td class="highlight">2×100</td>
              <td>75</td>
              <td>B</td>
            </tr>
            <tr>
              <td></td>
              <td>低级肉红</td>
              <td class="highlight">7999</td>
              <td>2×126</td>
              <td></td>
            </tr>
            <tr class="group-row">
              <td></td>
              <td class="group-title">112-D</td>
              <td>上级肉红</td>
              <td class="highlight">1×140</td>
              <td>65</td>
              <td>B</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>总量</td>
              <td class="highlight">23515</td>
              <td>2×858</td>
              <td></td>
            </tr>
          </tbody>
        </table> -->

        <table>
          <tbody>
            <template v-for="(group, index) in tableData" :key="index">
              <tr class="group-row">
                <td v-if="group.showImage" :rowspan="group.items.length" class="img-cell">
                  <img :src="group.image" alt="肉类" />
                </td>
                <td class="group-title">{{ group.title }}</td>
                <td>{{ group.items[0].name }}</td>
                <td class="highlight">{{ group.items[0].highlight }}</td>
                <td>{{ group.items[0].value }}</td>
                <td>{{ group.items[0].level }}</td>
              </tr>
              <tr v-for="(item, i) in group.items.slice(1)" :key="i">
                <td></td>
                <td>{{ item.name }}</td>
                <td class="highlight">{{ item.highlight }}</td>
                <td>{{ item.value }}</td>
                <td></td>
              </tr>
            </template>
            <tr class="group-row">
              <td></td>
              <td></td>
              <td>总量</td>
              <td class="highlight">{{ totalHighlight }}</td>
              <td>{{ totalValue }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bottom-numbers">
      <div class="num-row">
        <span v-for="n in [4004, 4005, 4006, 4007, 4008, 4009, 404]" :key="n" class="num">{{
          n
        }}</span>
      </div>
      <div class="num-row">
        <span v-for="n in [112, 1367, 4048, 6626, 2505, 1062, 2865]" :key="n" class="num">{{
          n
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; // Distribute space, circle will take more due to flex settings
  padding: clamp(2px, 0.5vh, 5px);
  box-sizing: border-box;
  background: transparent;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circle-container {
  position: relative;
  // width: clamp(100px, 20vh, 220px); // Circle width can be larger now
  width: 100%; // Take full width of its grid cell in parent
  max-width: clamp(120px, 22vh, 250px); // Max width for the circle, driven by vh
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(0, 229, 255, 0.08) 0%,
    rgba(0, 0, 0, 0.65) 80%
  );
  box-shadow:
    0 0 clamp(6px, 1.8vw, 14px) rgba(0, 229, 255, 0.45),
    inset 0 0 clamp(5px, 1.2vw, 11px) rgba(0, 229, 255, 0.3);
  margin: 0 auto clamp(2px, 0.5vh, 4px) auto; // Center horizontally, small bottom margin
  overflow: hidden;
  flex: 0 0 auto; // Circle takes its content size (driven by width/aspect-ratio)
  // Or, if we want it to be a proportion of the gauge wrapper:
  // flex-basis: 70%; // Example: Circle aims for 70% of the wrapper's height
  // max-height: 70%; // Ensure it doesn't exceed this if flex-basis is used
}

.dot {
  position: absolute;
  width: clamp(1.2px, 0.35vh, 2.5px);
  height: clamp(1.2px, 0.35vh, 2.5px);
  background: radial-gradient(circle, #18ffff 0%, #00b0ff 70%);
  border-radius: 50%;
  box-shadow: 0 0 clamp(1px, 0.25vh, 3.5px) rgba(0, 229, 255, 0.55);
  transform: translate(-50%, -50%);
  animation: pulse 1.3s infinite alternate;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 clamp(1px, 0.25vh, 3.5px) rgba(0, 229, 255, 0.55);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 0 0 clamp(2.5px, 0.45vh, 5.5px) rgba(0, 229, 255, 0.75);
  }
}

.center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 88%;
  transform: translate(-50%, -50%);
  color: #b0e7ff;
  text-align: center;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  font-size: clamp(6px, 1.3vh, 11px); // Slightly larger for bigger circle
  text-shadow: 0 0 clamp(1px, 0.25vh, 2.5px) rgba(0, 229, 255, 0.3);
}

.header-text {
  font-size: clamp(9px, 1.8vh, 14px); // Larger
  font-weight: 600;
  margin: clamp(1.5px, 0.35vh, 3.5px) 0;
  color: #18ffff;
  text-shadow: 0 0 clamp(2.5px, 0.55vh, 5.5px) rgba(0, 229, 255, 0.45);
}

.sub-text {
  font-size: clamp(7px, 1.2vh, 10px); // Larger
  color: #80d8ff;
  margin: clamp(1px, 0.25vh, 2.5px) 0;
}

.row {
  display: flex;
  justify-content: center;
  gap: clamp(2.5px, 0.6vw, 6px);
  margin: clamp(1px, 0.25vh, 2.5px) 0;
  font-weight: 400;
}

.row > div {
  padding: clamp(1px, 0.15vh, 2px) clamp(1.5px, 0.35vw, 3.5px);
  background: rgba(0, 229, 255, 0.09);
  border-radius: clamp(1.5px, 0.25vh, 3px);
  color: #b0e7ff;
  font-size: clamp(6px, 1.1vh, 9px); // Larger
  word-break: break-all;
}

.highlight {
  color: #18ffff;
  font-weight: 500;
  text-shadow: 0 0 clamp(1.5px, 0.35vh, 4.5px) rgba(0, 229, 255, 0.4);
}

.o-text {
  font-weight: 600 !important;
  font-size: clamp(11px, 2.2vh, 18px) !important; // Larger
  color: #18ffff !important;
  text-shadow:
    0 0 clamp(1.5px, 0.35vh, 4.5px) #00b0ff,
    0 0 clamp(2.5px, 0.65vh, 8.5px) rgba(0, 229, 255, 0.65) !important;
}

/* Table and numbers will take less space */
.custom-table-wrapper {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin-bottom: clamp(1px, 0.3vh, 3px);
  overflow: hidden;
  flex: 0 1 auto; /* Allow shrinking, don't grow much, base on content */
  // max-height: 25%; // Example: Table aims for 25% of wrapper height
  display: flex;
  flex-direction: column;
}

.custom-table {
  width: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 3px;
  box-shadow: 0 0 clamp(2px, 0.8vw, 6px) rgba(0, 229, 255, 0.2);
  padding: clamp(1px, 0.3vw, 3px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.custom-table table {
  width: 100%;
  font-size: 5em;
  line-height: 1.8;
}

.custom-table th,
.custom-table td {
  padding: 25px 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: clamp(1px, 0.2vh, 3px);
  table-layout: fixed;
  flex-grow: 1;
}

td {
  border: 0.5px solid rgba(0, 229, 255, 0.08);
  padding: clamp(0.5px, 0.15vh, 3px) clamp(1px, 0.2vw, 2.5px);
  text-align: center;
  font-size: clamp(12px, 2vh, 15px); // Smaller for table
  color: #b0e7ff;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  line-height: 1.05;
}

.group-title {
  color: #00e5ff;
  font-weight: 500;
  font-size: clamp(12px, 2vh, 16px); // Smaller
  letter-spacing: 0.1px;
  text-shadow: 0 0 clamp(1.5px, 0.3vh, 4px) rgba(0, 229, 255, 0.35);
}

.img-cell {
  width: clamp(110px, 4vw, 120px);
  padding: clamp(0.5px, 0.1vh, 1px) !important;
}

.img-cell img {
  // width: 100%;
  aspect-ratio: 1/1;
  max-width: 100px;
  object-fit: contain;
  border-radius: clamp(1px, 0.15vh, 1.5px);
  // border: 0.5px solid #00e5ff;
  // box-shadow: 0 0 clamp(1px, 0.2vh, 2.5px) rgba(0, 229, 255, 0.25);
  display: block;
  margin: auto;
}

.bottom-numbers {
  width: 100%;
  max-width: 100%;
  margin-top: clamp(1px, 0.2vh, 2.5px);
  padding: clamp(0.5px, 0.15vh, 1.5px) 0;
  box-sizing: border-box;
  flex: 0 0 auto; // Don't grow, take minimal space
  // max-height: 10%; // Example: Numbers aim for 10% of wrapper height
}

.num-row {
  display: flex;
  justify-content: center;
  gap: clamp(1px, 0.2vw, 3.5px);
  padding: clamp(0.5px, 0.15vh, 1.5px) 0;
  flex-wrap: wrap;
}

.num {
  color: #00e5ff;
  font-weight: 500;
  font-size: clamp(6px, 0.9vh, 9px); // Smaller
  min-width: auto;
  text-align: center;
  border-radius: 2px;
  padding: clamp(0.5px, 0.15vh, 1px) clamp(1px, 0.2vw, 2.5px);
  background: rgba(0, 229, 255, 0.07);
  box-shadow: inset 0 0 clamp(1px, 0.15vh, 2px) rgba(0, 229, 255, 0.2);
  flex-grow: 1;
  flex-basis: auto;
}
</style>

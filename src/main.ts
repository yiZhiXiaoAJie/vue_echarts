/*
 * @Author: 马世洁 mashijiezuishuai@outlook.com
 * @Date: 2025-05-12 11:18:56
 * @LastEditors: 马世洁 mashijiezuishuai@outlook.com
 * @LastEditTime: 2025-05-15 17:22:53
 * @FilePath: \vue_echarts\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 插件
import FitScreen from '@fit-screen/vue'
import './utils/rem.js'

// 组件
import vue3SeamlessScroll from 'vue3-seamless-scroll'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('FitScreen', FitScreen) // ✅ 如果它是组件
app.use(vue3SeamlessScroll, {
  name: 'vue3-seamless-scroll'
})

app.mount('#app')

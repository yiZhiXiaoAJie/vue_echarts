/*
 * @Author: 马世洁 mashijiezuishuai@outlook.com
 * @Date: 2025-05-12 11:18:56
 * @LastEditors: 马世洁 mashijiezuishuai@outlook.com
 * @LastEditTime: 2025-05-14 10:07:10
 * @FilePath: \vue_echarts\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/base.scss'
import App from './App.vue'
import router from './router'
import vue3SeamlessScroll from 'vue3-seamless-scroll'
import FitScreen from '@fit-screen/vue'
const app = createApp(App)
import './utils/rem.js';
app.use(createPinia())
app.use(router)
app.use(FitScreen)
app.use(vue3SeamlessScroll)
app.mount('#app')

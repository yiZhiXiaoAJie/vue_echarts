/*
 * @Author: 马世洁 mashijiezuishuai@outlook.com
 * @Date: 2025-05-14 09:40:04
 * @LastEditors: 马世洁 mashijiezuishuai@outlook.com
 * @LastEditTime: 2025-05-14 09:40:13
 * @FilePath: \vue_echarts\src\utils\rem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
;(function init(screenRatioByDesign = 16 / 9) {
  const docEle = document.documentElement

  function setHtmlFontSize() {
    const screenRatio = docEle.clientWidth / docEle.clientHeight
    // 如果当前屏幕宽高比大于设计稿比例，则用设计稿比例除以当前比例，保证16:9比例不变
    const fontSize =
      ((screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1) *
        docEle.clientWidth) /
      10
    docEle.style.fontSize = fontSize.toFixed(3) + 'px'
  }

  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
})()

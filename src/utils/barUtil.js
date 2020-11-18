const barUtil = {}

// 计算 tabs 偏移距离
barUtil.setUnderlineLeft = index => {
  if (Object.prototype.toString.call(index) === '[object Undefined]') return

  // am-tabs-bar
  const amTabsNodes = document.querySelector(
    '#level_s-tab-bar .am-tabs-default-bar-content'
  )

  // am-tabs-bar 第一个元素 id
  const arrayFromAmTabsNodes = `${amTabsNodes.childNodes[0].id
    .split('-')
    .slice(0, -1)
    .join('-')}-${index}`

  // 总宽度
  const { offsetWidth } = document.getElementById('ht-tabs')

  // 当前选中 tab 宽度，距左
  const { offsetLeft, clientWidth } = document.getElementById(
    arrayFromAmTabsNodes
  )

  // 下划线宽度
  const lineOffsetWidth = document.querySelector(
    '.am-tabs-default-bar-underline'
  ).offsetWidth

  // （ 距左 + 自身宽度/2 - 下划线宽度/2 ）/总宽度
  const underlineLeft =
    (offsetLeft + clientWidth / 2 - lineOffsetWidth / 2) / offsetWidth

  // eslint-disable-next-line consistent-return
  return underlineLeft
}

export default barUtil

/**
 * 智齿
 */
const sysNum = 'e48eeecb16584fed8b8aedf3b0072b18' // 智齿 sysNum
const robotGroupId = '8440453721584df69dd3c12fa236b1b9' // 机器人
const artificialGroupId = 'f6b7f57257134b39ab5b8c3b00236c15' // 人工
const customBaseUrl = 'https://www.sobot.com/chat/pc/index.html'

function getRobot(name = '') {
  let robotFlag = 2

  if (['公务员', '选调生', '公遴选'].includes(name)) {
    robotFlag = 2
  } else if (['事业单位', '面试'].includes(name)) {
    robotFlag = 3
  } else {
    robotFlag = 4
  }

  return robotFlag
}

/**
 * 个人中心客服 Url
 *
 */
export function UserCustomerURI({ robotFlag = 1 }, userInfo = '') {
  const url = `${customBaseUrl}?sysNum=${sysNum}&robotFlag=${robotFlag}`
  const groupUrl = `${url}&params=${encodeURI(
    `{"customInfo":"${userInfo}"}`
  )}&uname=${userInfo}&realname=${userInfo}&moduleType=3&groupId=${robotGroupId}`
  const last = `${url}&isCustomSysFlag=true&wurl=${encodeURI(groupUrl)}`

  return last
}

/**
 * 售前首页客服 Url
 *
 * @param {object} param 课程分类
 * @param {string} userInfo
 */
export function PresaleCustomerURI({ name }, userInfo = '') {
  const robotFlag = getRobot(name)

  const url = `${customBaseUrl}?sysNum=${sysNum}&robotFlag=${robotFlag}&params=${encodeURI(
    `{"customInfo":"${userInfo}"}`
  )}&uname=${userInfo}&realname=${userInfo}&groupId=${artificialGroupId}`

  return url
}

// 售前课程详情页
export function PresaleClassCustomerURI({
  name,
  userInfo = '',
  title,
  href,
  classImg
}) {
  const robotFlag = getRobot(name)
  const url = `${customBaseUrl}?sysNum=${sysNum}&robotFlag=${robotFlag}&params=${encodeURI(
    `{"customInfo":"${userInfo}"}`
  )}&uname=${userInfo}&realname=${userInfo}&groupId=${artificialGroupId}&title_info=${title}&url_info=${encodeURIComponent(
    href
  )}&thumbnail_info=${encodeURI(classImg)}`
  return url
}

// 订单
export function OrderCustomerURI(name, userInfo = '', href) {
  const robotFlag = getRobot(name)
  const url = `${customBaseUrl}?sysNum=${sysNum}&robotFlag=${robotFlag}&params=${encodeURI(
    `{"customInfo":"${userInfo}"}`
  )}&uname=${userInfo}&realname=${userInfo}&groupId=${artificialGroupId}&url_info=${encodeURIComponent(
    href
  )}`

  return url
}

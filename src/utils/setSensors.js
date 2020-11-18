import { func } from "prop-types"

/**
 * M 站埋点
 */
export function ClickCourse(params) {
  return (
    sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_ClickCourse', params)
  )
}

export function CilckButton(params) {
  return (
    sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_CilckButton', params)
  )
}

// 点击搜索框
export function ClickSearchBar(params) {
  return (
    sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_ClickSearchBar', params)
  )
}

// 发起搜索请求
export function SearchPlease(params) {
  return (
    sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_SearchPlease', params)
  )
}

// 点击课程搜索结果
export function SearchResultCourse(params) {
  return (
    sensors &&
    sensors.track('HuaTuOnline_M_HuaTuOnline_SearchResultCourse', params)
  )
}

// 点击资讯,备考精华搜索结果
export function SearchResultNews(params) {
  return (
    sensors &&
    sensors.track('HuaTuOnline_M_HuaTuOnline_SearchResultNews', params)
  )
}
export function ToApp(params) {
  return sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_ToApp', params)
}

// 浏览文章详情
export function NewsDetailView(params) {
  return (
    sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_NewsDetailView', params)
  )
}

// 华图在线_M站_华图在线_点击拼团课程相关
export function ClickGroupClassInfo(params) {
  return sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_CollageCourseCorrelation', params)
}

// 参与拼团
export function joinGroup(params) {
  return sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_ClickJoin', params)
}

// 我要开团
export function openGroup(params) {
  return sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_OpenCollage', params)
}

// 点击课程弹窗相关
export function openQRcode(params) {
  return sensors && sensors.track('HuaTuOnline_M_HuaTuOnline_ClickCourseWindowCorrelation', params)
}

// 点击当前推荐课程
export function clickCurrentCourse(params) {
  return sensors && sensors.track('HuaTuOnline_app_pc_m_HuaTuOnline_LiveTeachingBuyNow', params)
}

// 点击推荐课程
export function clickRecommendIcon(params) {
  return sensors && sensors.track('HuaTuOnline_app_pc_m_HuaTuOnline_LiveTeachingCilickRecommendCourse', params)
}
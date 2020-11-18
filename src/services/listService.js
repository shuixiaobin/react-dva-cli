import request from '../utils/request'

export function getClassList(params) {
  return request.get('/lumenapi/v5/c/class/app_list', { params })
}

export function getCollectList(params) {
  return request.get('/lumenapi/v5/c/class/collect_detail', { params })
}

export function getCateDetailList(params) {
  return request.get('/lumenapi/v5/c/class/type_detail', { params })
}

// 热门资讯列表
export function getArticleList(params) {
  return request.get('/lumenapi/v5/m/article/article_list', { params })
}

// tag 列表
export function getArticleTagList(params) {
  return request.get('/lumenapi/v5/m/article/tag_article', { params })
}

// 备考精华列表
export function getNoteList(params) {
  return request.get('/lumenapi/v5/c/article/article', { params })
}

// 课程列表搜索
export function searchClassList(params) {
  return request.get('/lumenapi/v5/c/class/search', { params })
}

// tag 标签
export function getTagList(params) {
  return request.get('/lumenapi/v5/m/article/tag_list', { params })
}

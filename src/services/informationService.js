import request from '../utils/request'

export function getFilterList(params) {
  return request.get(
    '/lumenapi/v5/m/article/filter_list',
    { params }
  )
}

export function getInforMationDetail(params) {
  return request.get(
    '/lumenapi/v5/m/article/article_detail',
    { params }
  )
}

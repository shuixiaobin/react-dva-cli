import request from '../utils/request'

// 我的课程筛选列表
export function getFilterType(params) {
  return request.get('/lumenapi/v5/c/class/my_course_filter', {
    params
  })
}
// 我的课程
export function getMyClass(params) {
  return request.get('/lumenapi/v5/c/class/my_new_course', {
    params
  })
}

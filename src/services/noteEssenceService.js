import request from '../utils/request'

// eslint-disable-next-line import/prefer-default-export
export function getNoteEssenceDetail(params) {
  return request.get('/lumenapi/v5/m/article/essence_detail', { params })
}

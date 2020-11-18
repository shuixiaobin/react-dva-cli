import request from '../utils/request'

// 上线替换接口域名
export function getCateList(params) {
  return request.get('/lumenapi/v5/m/class/cate_list', {
    params
  })
}

export function getWxConfig(params) {
  return request.get('/lumenapi/v5/c/order/share_wechat_signature', { params })
}


export function getAreaJson() {
  return request.get('//wap.huatu.com/public/javascript/areaData.json', {})
}

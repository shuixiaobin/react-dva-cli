import request from '../utils/request'

// 协议
export const GetUserInforSignup = params =>
  request.get(`/lumenapi/v4/common/protocol/user_protocol_info`, {
    params
  })

export const PostUserInforSignup = json =>
  request.post(`/lumenapi/v4/common/protocol/user_protocol_info`, {
    json
  })

// 协议模版
export const GetSignupH5Template = params =>
  request.get(`/lumenapi/v4/common/protocol/protocol_info`, {
    params
  })

// 获取协议内容h5地址
export const GetProtocolInfo = params =>
  request.get(`/lumenapi/v4/common/protocol/protocol_info`, { params })

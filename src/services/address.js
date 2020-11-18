import request from '../utils/request'

export const deleteAddress = params =>
  request.delete('/lumenapi/v4/common/user/del_address', {
    params
  })

export const getAddressList = params =>
  request.get(`/lumenapi/v4/common/user/address`, {
    params
  })

export const updateAddress = params =>
  request.put('/lumenapi/v4/common/user/update_address', {
    params
  })

export const addAddress = params =>
  request.post('/lumenapi/v4/common/user/add_address', {
    params
  })

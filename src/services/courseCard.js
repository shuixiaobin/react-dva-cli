import request from '../utils/request'


export const activeCard = json => {
  return  request.post(`/lumenapi/v5/c/card/card_activate`, { json, headers: {
      terminal: 7,
      token: getCookie('ht_token')
    }
  })
}
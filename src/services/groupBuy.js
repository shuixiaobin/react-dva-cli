import request from '../utils/request'
import servicesUrl from "@/utils/config";
const { baseJavaUrl } = servicesUrl;

//更多拼团
export const getMore = params =>
request.get(`${baseJavaUrl}/c/v6/order/collage/moreCollage`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token") 
    }
});


export const getClass = params =>
request.get(`${baseJavaUrl}/c/v6/order/collage/moreCollage`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token") 
    }
});





//拼团详情
export const getGroupDetail = params =>
request.get(`${baseJavaUrl}/c/v4/orders/share/detail`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token") 
    }
});








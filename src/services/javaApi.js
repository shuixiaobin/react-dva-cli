import servicesUrl from "@/utils/config";
import { getCookie, getQueryStr, getNormalCookie} from "@/utils/global";
import request from "../utils/request";

const { baseJavaUrl } = servicesUrl;

export const loginIn = params =>{
  const headers={
    cv: "7.1.5",
    terminal: 7,
    appType: getQueryStr("appType") ? getQueryStr("appType") : 2,
  }
  if(getCookie("htzxUps")) headers.analyticsData= encodeURIComponent(getCookie("htzxUps"));
  return request.post(`${baseJavaUrl}/u/v4/users/login`, {
    form: params,
    headers
  });
}


// 密码登录
export const passwordLogin = params =>{
  const headers={
    cv: "7.1.5",
    terminal: 7
  }
  if(getCookie("htzxUps")) headers.analyticsData= encodeURIComponent(getCookie("htzxUps"));
  return request.post(`${baseJavaUrl}/u/v4/users/login`, {
    form: params,
    headers
  });
}


// 注册
export const registerFn = params =>
  request.post(`${baseJavaUrl}/u/v2/users/register`, {
    form: params,
    headers: {
      cv: "7.1.5",
      terminal: 7
    }
  });
// 忘记密码
export const forgetPassword = params =>
  request.put(`${baseJavaUrl}/u/v1/users/resetpwd`, {
    form: params,
    headers: {
      cv: "7.1.5",
      terminal: 7
    }
  });

// 一对一
export const GetUserInforoto = params =>
  request.get(`${baseJavaUrl}/c/v6/my/1v1/${params.rid}`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token")
    }
  });


//获取选择器合集
export const getSkuCollection = params =>
  request.get(`${baseJavaUrl}/c/v6/courses/skuCollection`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token")
    }
});

// 课程售前
export const GetNewClassInfo = params =>
  request.get(`${baseJavaUrl}/c/v6/courses/classInfo`, {
    params,
    headers:{
      cv: "7.2.250",
      terminal: 7,
      token: getCookie("ht_token"),
    }
  });



export const PostUserInforoto = json => {
  request.post(`${baseJavaUrl}/c/v6/my/1v1/${json.rid}`, {
    json,
    headers:{
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token"),
    }
  });
};

// 备考精华 tabs
export function getNoteCateList(params) {
  return request.get(`${baseJavaUrl}/c/v1/exam/typeList`, { params });
}

// 历史记录
export function getOtherSearch(params) {
  return request.get(`${baseJavaUrl}/s/v1/search/course/keywords`, {
    params,
    headers:{
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token"),
    }
  });
}

export const sendCode = params =>
  request.get(`${baseJavaUrl}/u/v2/users/captcha/${params}?type=M`);

export const forgetSendCode = params =>
  request.get(`${baseJavaUrl}/u/v2/users/findPasswordCaptcha/${params}?type=M`);
// 首页轮播图
export const getmCarousel = params =>
  request.get(`${baseJavaUrl}/u/v5/users/bc/mList`, { params });

// 获取双师课表
export const getSchedule = id =>
  request.post(
    `${baseJavaUrl}/c/v1/snj/lessonTable/getTimeTableByGoodsId/${id}`,
    {
      form: {
        cv: "7.1.5",
        goodId: id,
        terminal: 7
      },
      headers: {
        cv: "7.1.5",
        terminal: 7
      }
    }
  );

  // 获取正在拼团列表
  export const getGroupBuyList = params => request.get(`${baseJavaUrl}/c/v4/orders/collage/activityAll`, {
    params,
    headers:{
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token"),
    }
  });


// 获取弹窗二维码接口
export function getCode(params) {
  return request.get(`${baseJavaUrl}/c/v5/courses/${params.classId}/getQqGroupSchedule`, {
    params:{ orderId: params.orderId},
    headers: {
      cv: "7.1.5",
      terminal: 7,
      token: getCookie("ht_token"),
    }
  })
}

// 获取直播橱窗商品列表
export function getGoodsList(params) {
  return request.get(`${baseJavaUrl}/c/v6/courses/live/goods/list`, {
    params,
    headers:{
      cv: "7.1.5",
      terminal: 7,
    }
  })
}

// 获取正在推广的商品信息
export function getCurrentGoodInfo(params) {
  return request.get(`${baseJavaUrl}/c/v6/courses/live/goods/current`, {
    params,
    headers: {
      cv: "7.1.5",
      terminal: 7,
    }
  })
}

export function getEvaluateList(params) {
  return request.get(`${baseJavaUrl}/c/v6/evaluation/getBookEvaluation`, {
    params,
    headers: {
      terminal: 7,
    }
  })
}
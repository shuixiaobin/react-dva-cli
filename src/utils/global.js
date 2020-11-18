import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import { Toast } from "antd-mobile";
import * as order from "@/services/order";
import {
  UserCustomerURI,
  PresaleCustomerURI,
  PresaleClassCustomerURI,
  OrderCustomerURI
} from "./customService";
import layout from "./layout";
import { commonEventUp ,parseQueryString} from '@/utils/upData.js'


layout.scrollIntoView(); // 解决键盘弹出后挡表单的问题

const ROOT = document.getElementById("root");

// 个人中心
export function JumpUserCustomer() {
  window.location.href = UserCustomerURI(...arguments);
}

// 首页
export function JumpPresaleCustomer() {
 // window.location.href = PresaleCustomerURI(...arguments);
  commonEventUp({
    eventId:6
  })
  window.setTimeout(()=>{
    window.location.href = PresaleCustomerURI(...arguments);
  },500)
}

// 售前课程详情
export function PresaleClassCustomer() {
  const obj= parseQueryString(window.location.href)
  const param= { eventId:6 };
  if(obj.classId) param.courseId=obj.classId;
  commonEventUp(param);
  window.setTimeout(()=>{
    window.location.href = PresaleClassCustomerURI(...arguments);
  },500)
}

// 订单
export function OrderCustomer() {
  window.location.href = OrderCustomerURI(...arguments);
}

export function disableScroll($el) {
  const element = $el || ROOT;
  disableBodyScroll(element);
}

export function unDisableScroll($el) {
  const element = $el || ROOT;
  enableBodyScroll(element);
}

export function clearBodyScrollLocks() {
  clearAllBodyScrollLocks();
}

export function getCookie(name) {
  let arr;

  // if(NODE_ENV == 'development'){
  //   name = `${name  }_${  NODE_ENV}`;
  // }

  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);

  if ((arr = document.cookie.match(reg))) return arr[2];
  return null;
}


export function getNormalCookie(name) {
  let arr;
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);

  if ((arr = document.cookie.match(reg)) || getCookie(name)) {
    return arr[2] || getCookie(name)
  }
  return null;
}



export function setCookie(c_name, value, day=30, cookieDomain=COOKIE_DOMAIN) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + day);

  // if(NODE_ENV == 'development'){
  //   c_name = `${c_name  }_${  NODE_ENV}`;
  // }
// 使用encodeURI编码为了兼容safair浏览器
  const currentCookie = `${c_name}=${value};expires=${exdate.toGMTString()};path=/;domain=${cookieDomain}`;

  document.cookie = currentCookie;
}

export function getUnescapeCookie(name) {
  return JSON.parse(decodeURI(getCookie(name))) || "";
}

export function makeMap(arr, key) {
  const res = Object.create(null);
  if (!key) {
    arr.forEach(key => (res[key] = true));
  } else {
    arr.forEach(obj => (res[obj[key]] = obj));
  }
  return res;
}

export function getQueryStr(name) {
  const query = window.location.href.replace("?#", "#").split("?")[1];
  if (query) {
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === name) {
        return pair[1];
      }
    }
  }
  return false;
}

export function getQueryVariable(url) {
  const obj = {};
  let arr = [];

  url = url.replace(/^.*?\?/, '');
  url = url.replace(/#.*\?/, '');
  arr = url.split('&');

  arr.forEach(el => {
      const r = el.match(/(.+)=(.*)/);
      if (r) {
          const key = r[1];
          const value = r[2] || null;
          obj[key] = value;
      }
  })
  return obj;
}

export function parse_url(key = "") {
  // 定义函数
  if (key === "") {
    return "";
  }
  const url = window.location.href;
  const reCat01 = `/${key}=[^&]*/g`;
  const reCat = eval(`(${reCat01})`); // 对象化
  let value;

  try {
    value = window.location.href
      .split("?")[1]
      .match(reCat)[0]
      .replace(`${key}=`, "");
  } catch (e) {
    value = "";
  }
  return value;
}

export function getQueryCode(){
  let result ='';
  const str =window.location.search.split("code=");
  if(str[1]){
    result = str[1].split("&state=123")[0]
  }
  return result;
}


export function formatDate(date) {
  if (Object.prototype.toString.call(date) !== "[object Date]") return date;
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  return `${dateStr}`;
}

export const wxSdkPay = {
  wxCode: "",
  isWxBrowser: () => {
    const ua = window.navigator.userAgent.toLowerCase();  
    return ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("windowswechat") == -1; 
  },
  setWxCode(d) {
    order
      .getOpenId({ code: d })
      .then(res1 => {
        setCookie("UserOpen", res1.openId);
        window.history.replaceState(
          {},
          0,
          window.location.href.replace(/code=[\s\S]*\&state=123\?{0,1}/, "")
        );
      })
      .catch(err => {
        Toast.fail("服务异常，请刷新浏览器重试！", 8);
        window.history.replaceState(
          {},
          0,
          window.location.href.replace(/code=[\s\S]*\&state=123\?{0,1}/, "")
        );
      });
  },
  isNeedCode() {
    if (
      this.isWxBrowser() &&
      (!getNormalCookie("UserOpen") || getNormalCookie("UserOpen") == null)
    ) {
      const paramsCode = parse_url("code") || getQueryCode(); // 获取url上code
      if (paramsCode) {
        // 拿到微信code
        this.setWxCode(paramsCode);
      } else {
        // 获取微信code,刷新获取
        this.getWxCode();
      }
    }
  },
  getWxCode() {
    const appId = "xyew";
    if (window.location.href.indexOf('?#') < 0) {
      window.history.replaceState(
        {},
        0,
        window.location.href.replace('#', '?#')
      )
    }
    const local = window.location.href;
    // const local = window.location.origin + window.location.pathname + window.location.hash;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      local
    )}&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect`;
    //
    
    window.location.href = url;
  },
  wxToPay(obj) {
    // 微信支付SDK
    console.log("wx参数++++++++++");
    console.log(obj);
    return new Promise((resolve, reject) => {
      function onBridgeReady() {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: obj.appId, // 公众号id，由商户传入
            timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
            nonceStr: obj.nonceStr, // 随机串
            package: obj.package, // 订单详情扩展字符串
            signType: obj.signType, // 微信签名方式：
            paySign: obj.paySign // 微信签名
          },
          res => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              resolve("payOk");
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              resolve("payCancel");
            } else {
              resolve("payError");
            }
          }
        );
      }
      if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    });
  }
};

export const setReferrer = title => {
  sessionStorage.setItem("referrer", title);
};

export const getReferrer = () => sessionStorage.getItem("referrer");

export const closest = (el, selector) => {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

export const isInApp = () => navigator.userAgent.indexOf("HuaTuOnline") > -1;

export function formatTimestamp(val, isDate) {
  const time = new Date(val);
  const y = time.getFullYear();
  const m =
    Number(time.getMonth() + 1) > 9
      ? time.getMonth() + 1
      : `0${time.getMonth() + 1}`;
  const d = Number(time.getDate()) > 9 ? time.getDate() : `0${time.getDate()}`;
  const h =
    Number(time.getHours()) > 9 ? time.getHours() : `0${time.getHours()}`;
  const mm =
    Number(time.getMinutes()) > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
  if (isDate) {
    return `${h}:${mm}`;
  }
  return `${y}-${m}-${d}`;
}

export function throttle(fn, wait) {
  let prev = new Date().getTime()
  return (...args) => {
    const now = new Date().getTime()
    if (now - prev > wait) {
      prev = now
      fn.apply(this, args)
    }
  }
}


export function getQueryVal(url, name) {
  const query = url.split("?")[1];
  if (query) {
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === name) {
        return pair[1];
      }
    }
  }
  return false;
}
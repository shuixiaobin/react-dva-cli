/**
 * 重定向
 */

function getUrlQuery(name) {
  // 会剃掉?和#之间的内容
  let url = window.location.href;
  url = url.replace(/\?.*#/, "#");
  const query = url.replace("?#", "#").split("?")[1];
  if (query) {
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === name) {
        try {
          return decodeURIComponent(pair[1]);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  return false;
}

// // 是否为ipad设备
//pad上、app外则跳到pc站
function is_iPad() {
  // HuaTuOnline
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("pad") > -1 && ua.indexOf("huatuonline") == -1) {
    return true;
  }
  return false;
}


function isMobile() {
  const mobile = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return mobile != null;
}

// is_iPad()

// 跳转语句
if (!isMobile() || is_iPad()) {
  // 跳转至PC端
  // 1. 课程合集页面；
  // http://m.v.huatu.com/wap/#/other/collectList?collectId=509&title=2019%   =>http://v.huatu.com/htzx/live-collection.shtml?collectionid=1020&collectTitle=2019%E8%BE%BD%
  // 2. 课程详情页；
  // http://m.v.huatu.com/wap/#/class/classDetail?collageActiveId=0&classId=78253  ==>http://v.huatu.com/cla/class_detail_77245.htm
  // 3. 资讯详情页；
  //  http://m.v.huatu.com/wap/?#/other/informationDetail?id=516196&date=20190918   ==>http://v.huatu.com/news/20190918/516196.html

  let url = window.location.href;
  let defaultUrl = "";
  url.replace(/#\/(.*)\?/, function () {
    url = arguments[1];
  });

  switch (url) {
    case "other/collectList":
      defaultUrl = `${PCURL}/htzx/live-collection.shtml?collectionid=${getUrlQuery(
        "collectId"
      )}&collectTitle=${getUrlQuery("title")}`;
      break;
      
    case "class/groupClass":
    case "class/classDetail":
      defaultUrl = `${PCURL}/cla/class_detail_${getUrlQuery("classId")}.htm`;
      break;
    case "other/informationDetail":
      defaultUrl = `${PCURL}/news/${getUrlQuery("date")}/${getUrlQuery(
        "id"
      )}.html`;
      break;
    default:
      defaultUrl = PCURL;
      break;
  }
  console.log(defaultUrl);
  window.location.href = defaultUrl;
}

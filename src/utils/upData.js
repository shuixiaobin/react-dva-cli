
  var region= ".huatu.com";


  //自主上报逻辑
  var upData={
    referer:encodeURIComponent(document.referrer),//前置来源
    curl:encodeURIComponent(window.location.href),
    fr:0,//渠道来源（数字格式）
    aid:0,//广告位id(数字格式
    kid:0,//关键词唯一标识（数字格式）
    mtt:0,//{matchtype}匹配模式（数字格式）
    crt:0,//广告创意（数字格式）
    adp:'',//展现排名（字母+数字格式）
    pn:0,//搜索结果触发页面（数字格式）
    gid:0,//360推广组唯一标识（数字格式）
    pid:0,//360推广计划唯一标识（数字格式）
    dv:'',//360推广点击设备来源（字母格式）
    kd:'',//（进行UTF8转码，再进行URIencode编码）
    pl:'',//广告获得点击时所在网站的域名/网站展位定位条件
    uid: getUser().Uid,
    anonId:getUser().AnonId,
    eventId:1,
    eventSource:1
  }

  var keyNum=['fr','aid','kid','mtt','crt','pn','gid','pid']

  function getCookie(name) {
    let arr;
    if(NODE_ENV == 'development'){
      name = name + "_" + NODE_ENV;
    }
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  
    if ((arr = document.cookie.match(reg))) return arr[2];
    return null;
  }


  export function parseQueryString(url) {
    var params = {};
    url= location.search;
    if(/\?.*\?/.test(location.search)){
      url= url.slice(0,url.length-1);
    }else{
      return params;
    }
    
    var urls = url.split("?"); 
    var arr = urls[1].split("&"); 
    for (var i = 0, l = arr.length; i < l; i++) {
      var a = arr[i].split("=");               
      params[a[0]] = a[1];                    
    }                                       
    return params;
  }
  
  

  //第三方合作
  function setCookie(c_name, value, day, cookieDomain) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + day);

    if(NODE_ENV == 'development'){
      c_name = c_name + "_" + NODE_ENV;
    }

    if(day >0)
        var currentCookie = `${c_name}=${value};expires=${exdate.toGMTString()};path=/;domain=${cookieDomain}`;
    else
        var currentCookie = `${c_name}=${value};path=/;domain=${cookieDomain}`;

    document.cookie = currentCookie;
  }

  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  function getUser(){
        var visitorId ='';
        if( localStorage.getItem('visitorId') ){
                visitorId = localStorage.getItem('visitorId');
        }else{
                visitorId = guid();
                localStorage.setItem('visitorId',  visitorId);
        }

        return {
                  Uid:getCookie("UserMobile") || '',
                  AnonId:visitorId+''
               }
  }


  function loadImg(data,cb){      
    var myParent = document.createElement("div");
    var myImage = document.createElement("img");
    if(NODE_ENV == 'development'){
      myImage.src = "https://tkproc.huatu.com/track_t.gif?data=" + data;
    }else{
      myImage.src = "https://track.huatu.com/track.gif?data=" + data;
    }
    myParent.appendChild(myImage);
    myImage.onload = function() {
      if(cb) cb()
    }
  }

  function isNewParam(){
    var hasTc= false;
    var obj= parseQueryString(window.location.href);
    if(Object.keys(obj).length == 0){
      obj=getQueryVariable(window.location.href)
    }
    console.log(obj);
    if(!obj.fr) return false;
    Object.keys(upData).forEach(function(item,index){
                  if(obj[item]){
                      hasTc = true;
                      if(keyNum.indexOf(item) > -1 ) {
                        try {
                          upData[item] = Number(obj[item])
                        } catch (error) {
                          upData[item] = obj[item]
                        }
                      }else{
                        upData[item] = obj[item]
                      }
                  }
      });
      return hasTc
  }


  

  export function upTgData(){
      if( isNewParam() ){//有推广链接
            setCookie("htzxUps",JSON.stringify(upData), 1, region)
            var base64Data = window.btoa(JSON.stringify(upData));
            loadImg(base64Data)
      }else if(getCookie("htzxUps")){//无推广参数，有本地参数
            var theData= JSON.parse(decodeURIComponent(getCookie("htzxUps")));
            if(!theData.fr) {
              setCookie("htzxUps", '')
              return;
            }
            theData.curl = encodeURIComponent(window.location.href);
            setCookie("htzxUps",JSON.stringify(theData), 1, region)
            var base64Data = window.btoa(JSON.stringify(theData));
            loadImg(base64Data)
      }else{//处理自然流量

      } 
  }

  export function commonEventUp(param,cb){
    if(!getCookie("htzxUps")) return;
    var curUrl= JSON.parse(decodeURIComponent(getCookie("htzxUps")));
    curUrl.curl = encodeURIComponent(window.location.href);
    var data=  Object.assign(curUrl,param);
    var base64Data = window.btoa(JSON.stringify(data));
    loadImg(base64Data,cb)
  }


  export function clearUps(){
    setCookie("htzxUps",'')
    localStorage.removeItem('visitorId')
  }
 

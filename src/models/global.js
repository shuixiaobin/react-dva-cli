import titleConfig from '&/titleConfig'
import { getCookie,setCookie, getNormalCookie, parse_url } from '@/utils/global.js'

import { upTgData } from '@/utils/upData.js'

const SET_PAGE_INFO = 'SET_PAGE_INFO' // 页面信息
const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD' // 搜索关键词
export default {
  namespace: 'all',
  state: {
    token: '',
    userName: '',
    userHead: '',
    myUrl: '//p.htwx.net/m/',
    needLogin: false,
    headerMenuShow: false,
    cv: '7.1.5',
    keyWord: '',
    title: '',
    pageInfos: {}, // 页面信息
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (typeof sensors !== 'undefined' && location.pathname !== '/home') {
          sensors.quick('autoTrackSinglePage')
        }
        if (window.location.href.indexOf('?#') < 0) {
          window.history.replaceState(
            {},
            0,
            window.location.href.replace('#', '?#')
          )
        }

        if (
          getNormalCookie('UserOpen') &&
          getNormalCookie('UserOpen') != null &&
          window.location.href.indexOf('code=') > -1
        ) {
          // openId获取到以后剔除url上code
          window.history.replaceState(
            {},
            0,
            window.location.href.replace(/code=[\s\S]*\&state=123\?{0,1}/, '')
          )
        }

        document.title =
          titleConfig[location.pathname] ||
          '公务员考试_事业单位考试_华图在线手机站'
        dispatch({ type: 'saveRouter', payload: location })
        dispatch({ type: 'checkIsLogin' }) // 同步cookie
        // 防止在查看用户协议和找回密码时关闭登录弹窗
        if (!sessionStorage.getItem('showLogin')) {
          dispatch({ type: 'closeLogin' })
        }
        if(window.location.href.indexOf("jzl_kwd") > -1){// sem相关,九枝兰
          setCookie("jzlContent",window.location.href,7,'.huatu.com')
        }
        


        
        window.scrollTo(0, 0)
      })
    }
  },

  effects: {
    setSearchKeyword: [
      // eslint-disable-next-line func-names
      function*({ payload }, { put }) {
        yield put({ type: SET_SEARCH_KEYWORD, payload })
      },
      { type: 'takeLatest' }
    ]
  },

  reducers: {
    saveRouter(state, { payload: data }) {
      // 获取路由mate
      let title1 = titleConfig[data.pathname]
      if (data.search && data.pathname === '/other/addAddress') {
        title1 = '编辑地址'
      } else if (
        data.search.indexOf('orderAddressId') > -1 &&
        data.pathname === '/other/addressList'
      ) {
        title1 = '选择收货地址'
      }

      return {
        ...state,
        curRouter: data.pathname,
        title: title1
      }
    },
    closeLogin(state) {
      if (sessionStorage.getItem('showLogin')) {
        sessionStorage.removeItem('showLogin')
      }
      return { ...state, needLogin: false }
    },
    showLogin(state) {
      return { ...state, needLogin: true }
    },
    setHeaderMenuShow(state, { payload: data }) {
      return { ...state, headerMenuShow: data.show }
    },
    checkIsLogin(state) {
      if (state.userName == getCookie('UserName')) {
        return { ...state }
      }
      return {
        ...state,
        userName: getCookie('UserName') == null ? '' : getCookie('UserName'),
        userHead:
          getCookie('UserFace') == null
            ? ''
            : decodeURIComponent(getCookie('UserFace')),
        token: getCookie('ht_token') == null ? '' : getCookie('ht_token')
      }
    },

    [SET_SEARCH_KEYWORD](
      state,
      {
        payload: { keyWord }
      }
    ) {
      return { ...state, keyWord }
    },

    [SET_PAGE_INFO](
      state,
      {
        payload: { path, param = '' }
      }
    ) {
      return {
        ...state,
        pageInfos: {
          ...state.pageInfos,
          [path]: param ? { ...param } : ''
        }
      }
    }
  }
}

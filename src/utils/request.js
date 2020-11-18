import fetch from 'dva/fetch'
import { Toast } from 'antd-mobile'
import servicesUrl from './config'

const SUCCESS_CODE = 10000
const SUCCESS_CODE_JAVA = 1000000
const TIME_OUT = 15 // 配置超时时间

request.defaults = {
  baseURL: servicesUrl.baseUrl,
  timeout: TIME_OUT * 1000,
  headers: {
    Accept: 'application/json'
    // cv: '7.1.5',
    // terminal: 7
  }
}

const isPresent = obj => typeof obj !== 'undefined' && obj !== null

const encode = value =>
  encodeURIComponent(value)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')

// Encode a set of form elements as a string for submission.
const serialize = params => {
  const ret = []
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (isPresent(value)) {
      ret.push(`${encode(key)}=${encode(value)}`)
    }
  })

  return ret.join('&')
}
const combineURL = (baseUrl, path) =>
  `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
const isAbsoluteURL = url => /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
const isBlank = obj => typeof obj === 'undefined' || obj === null
const isEmpty = obj => {
  if (isBlank(obj)) {
    return true
  }

  if (obj.length === 0) {
    return true
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }

  return true
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const timeout = (p, ms = TIME_OUT * 1000) =>
  Promise.race([
    p,
    wait(ms).then(() => {
      const error = new Error(`请检查网络问题,稍后重试!`)
      error.statusCode = 408
      throw error
    })
  ])

// Request factory
function request(url, options, method) {
  const { endpoint, ...rest } = interceptRequest(url, options, method)
  const xhr = fetch(endpoint, rest).then(interceptResponse)

  // eslint-disable-next-line compat/compat
  return new Promise((resolve, reject) => {
    timeout(xhr, request.defaults.timeout)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err);
        const errorInfo= err.msg || err.message
        typeof errorInfo === 'string' ? Toast.fail(errorInfo) : Toast.offline('服务器错误!')
        reject(errorInfo)
      })
  })
}

// Headers factory
const createHeaders = () => {
  const headers = {
    ...request.defaults.headers
  }
  return headers
}

// Request interceptor
function interceptRequest(url, options, method) {
  let endpoint
  if (isAbsoluteURL(url)) {
    endpoint = url
  } else {
    endpoint = combineURL(request.defaults.baseURL, url)
  }
  let data = {
    method,
    endpoint,
    headers: createHeaders()
  }
  if (!isEmpty(options)) {
    if(options.headers && !options.headers.token){ // token为空需要剃掉
      delete options.headers.token
    }
    data = {
      ...data,
      ...options
    }

    if (options.json) {
      data.headers['Content-Type'] = 'application/json;charset=utf-8'
      data.body = JSON.stringify({ ...options.json, terminal: 7 })
    }

    if (options.form) {
      data.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=utf-8'
      data.body = serialize({ ...options.form, terminal: 7 })
    }

    if (options.body) {
      data.body = { ...options.body, terminal: 7 }
    }

    if (options.params) {
      endpoint += `?${serialize(options.params)}&terminal=7`
      data.endpoint = endpoint
    }
  }

  return data
}

// Response interceptor
/* eslint-disable consistent-return */
function interceptResponse(response) {
  return new Promise((resolve, reject) => {
    const emptyCodes = [204, 205]
    // Don't attempt to parse 204 & 205
    if (emptyCodes.indexOf(response.status) !== -1) {
      return resolve(response.ok)
    }
    if (response.ok) {
      const contentType = response.headers.get('Content-Type')
      if (contentType.includes('application/json')) {
          response.json().then(res1=>{ // resolve(res)
             res1.code === SUCCESS_CODE || res1.code === SUCCESS_CODE_JAVA
             ? resolve(res1.data)
             : res1 && !res1.code ? resolve(res1) : reject(res1)
          }).catch(err=>{
             reject(err)
          })
          return;
      } 
        return resolve(response)
      
    }

    if (response.status === 401) {
      const url = encodeURIComponent(window.location.href)
      Toast.fail('用户会话过期，请重新登录', 2, () => {
        window.location.href = `${ENVURL}home?redirect=${url}`
      })
      setCookie('ht_token', '')
      setCookie('UserName', '')
      setCookie('UserFace', '')
      setCookie('UserReName', '')
      setCookie('catgory', '')
      setCookie('UserId', '')
      setCookie('UserMobile', '')
      setCookie('ucId', '')
      return;
    }

    const error = new Error(response.statusText)
    try {
      response
        .clone()
        .json()
        .then(result => {
          error.body = result
          error.response = response
          reject(error)
        })
    } catch (e) {
      error.response = response
      reject(error)
    }
  })
}

/* eslint-enable consistent-return */

// suger
request.get = (url, options) => request(url, options, 'GET')

request.head = (url, options) => request(url, options, 'HEAD')

request.options = (url, options) => request(url, options, 'OPTIONS')

request.post = (url, options) => request(url, options, 'POST')

request.put = (url, options) => request(url, options, 'PUT')

request.delete = (url, options) => request(url, options, 'DELETE')

request.del = request.delete

export default request

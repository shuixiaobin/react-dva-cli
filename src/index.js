import React from 'react'
import dva from 'dva'
import createLoading from 'dva-loading'
import 'intersection-observer'
import '@/assets/style/cssreset.css'
import '@/assets/style/common.css'
import '@/assets/style/variable-font.css'
import '@babel/polyfill'
import { Toast } from 'antd-mobile'
import { Router } from 'dva/router'
import createRoutes from '@/router'
import qs from 'querystringify'
import * as global from '@/utils/global'

if (BUILD_ENV === 'production') {
  // 生产环境重定向
   import('@/utils/redirect').then(() => {
    // 测试环境 m站引入 vconsole
    if (NODE_ENV === 'development') {
      const vConsole = require('vconsole/dist/vconsole.min')
      new vConsole();
    }
  })
}

window.qs = qs

// eslint-disable-next-line no-return-assign
Object.keys(global).map(r => (window[r] = global[r]))

const createHistory = require('history/createHashHistory')

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(e, dispatch) {
    Toast.offline(`${e}`, 1)
  }
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/global').default)

// 4. Router
// app.router(require('./router').default);

app.router(({ history, app }) => (
  <Router history={history}>{createRoutes(app)}</Router>
))

wxSdkPay.isNeedCode()

// 5. Start
app.start('#root')

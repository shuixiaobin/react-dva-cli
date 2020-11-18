import { dynamicWrapper, createRoute } from '@/utils/core'

const routesConfig = app => ({
  path: '/home',
  title: '公务员考试_事业单位考试_华图在线手机站',
  component: dynamicWrapper(
    app,
    () => [import('./model')],
    () => import(/* webpackChunkName: "home" */ './root')
  )
})

export default app => createRoute(app, routesConfig)



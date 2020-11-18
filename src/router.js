import { createRoutes } from '@/utils/core'
import Container from '@/routes/container'
import Home from '@/routes/home'


/**
 * 主路由配置
 *
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [

  {
    path: '/',
    title: 'react脚手架demo',
    component: Container,
    indexRoute: '/home',
    childRoutes: [Home(app)]
  }
]

export default app => createRoutes(app, routesConfig)

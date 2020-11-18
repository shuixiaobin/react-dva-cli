/**
 * 容器
 */
import { connect } from 'dva'
import React, { Component } from 'react'
import { Switch } from 'dva/router'
import Loading from '@/components/loading/root'
import Login from '@/components/loginIn'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.dispatch({ type: 'all/checkIsLogin' }) // 登录后刷新操作处理
  }

  render() {
    const { routerData } = this.props
    const { childRoutes } = routerData
    return (
      <>
        <div>
          <p>我是头部</p>
        </div>
        {/* <p>父路由中的内容，每一个子路由中都显示本内容,最大的嵌套路由</p>
        <p>当前路由：{curRouter} </p>
        <p>title：{metaTitle} </p> */}

        <Loading>
          <Switch>{childRoutes}</Switch>
        </Loading>
        <Login />
      </>
    )
  }
}

function mapState(state) {
  return {
    myUrl: state.all.myUrl
  }
}

export default connect(mapState)(Container)

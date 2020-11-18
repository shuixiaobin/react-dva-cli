import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Modal, Tabs } from 'antd-mobile'
import CodeLogin from './components/CodeLogin'
import PasswordLogin from './components/PasswordLogin'
import Register from './components/Register'
import login from './loginIn.less'

class LoginIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPassword: false,
      tabStr: '登录',
      tabs: [
        {
          title: '登录'
        },
        {
          title: '注册'
        }
      ]
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('isPassword') === 'true') {
      this.setState({
        isPassword: true
      })
    }
  }

  onClose = () => {
    // 关闭登录
    const { dispatch } = this.props
    dispatch({ type: 'all/closeLogin' })
    sessionStorage.removeItem('isPassword')
  }

  handleChange = () => {
    const { isPassword } = this.state
    this.setState({
      isPassword: !isPassword
    })
  }

  goPassword = () => {
    const { dispatch } = this.props
    const { isPassword } = this.state
    sessionStorage.setItem('isPassword', isPassword)
    dispatch({ type: 'all/closeLogin' })
    dispatch(routerRedux.push({ pathname: '/other/password' }))
  }

  tabChange = tab => {
    this.setState({
      tabStr: tab.title
    })
  }

  render() {
    const { needLogin } = this.props
    const { isPassword, tabs, tabStr } = this.state
    return (
      <Modal
        className={login.parent}
        popup
        visible={needLogin}
        onClose={this.onClose}
        animationType="slide-up"
        afterClose={() => {}}
      >
        <div className={login.parent1}>
          <div className={login.titleWrapper}>
            <p className={login.title}>
              {!isPassword ? '手机验证码登录' : '密码登录'}
            </p>
            <div className={login.delete} onClick={this.onClose}>
              <i className="iconfont iconCombinedShapex- f40" />
            </div>
          </div>
          {!isPassword ? (
            <CodeLogin {...this.props} />
          ) : (
            <Tabs
              style={{ width: '92%' }}
              tabs={tabs}
              initialPage={0}
              swipeable={false}
              tabBarUnderlineStyle={{
                borderBottom: '2px solid #EB585B'
              }}
              tabBarActiveTextColor="#EB585B"
              onChange={(tab, index) => {
                this.tabChange(tab, index)
              }}
            >
              <PasswordLogin {...this.props} tabStr={tabStr} />
              <Register {...this.props} tabStr={tabStr} />
            </Tabs>
          )}

          <p className={login.LoginPassword}>
            <span onClick={this.handleChange}>
              {isPassword ? '手机验证码登录' : '密码登录'}
            </span>
            {isPassword ? (
              <span className={login.forget} onClick={this.goPassword}>
                忘记密码？
              </span>
            ) : null}
          </p>
        </div>
      </Modal>
    )
  }
}

function mapState(state) {
  return {
    needLogin: state.all.needLogin
  }
}

export default connect(mapState)(LoginIn)

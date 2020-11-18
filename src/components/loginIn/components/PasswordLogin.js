import React, { Component } from 'react'
import { connect } from 'dva'
import { InputItem, Toast } from 'antd-mobile'
import { routerRedux } from 'dva/router'
import { passwordLogin } from '@/services/javaApi'
import { getQueryStr, setCookie } from '@/utils/global'
import login from '../loginIn.less'

class PasswordLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordWrong: false,
      username: '',
      password: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tabStr } = this.props
    if (tabStr !== nextProps.tabStr) {
      this.inputRef.state.value = ''
      this.passwordRef.state.value = ''
      this.setState({
        passwordWrong: false,
        username: '',
        password: ''
      })
    }
  }

  clearError = () => {
    this.setState({
      passwordWrong: false
    })
  }

  checkPassword = () => {
    const { password } = this.state
    if (password.length < 6) {
      this.setState({
        passwordWrong: true
      })
    }
  }

  goAgreement = () => {
    const { dispatch } = this.props
    dispatch({ type: 'all/closeLogin' })
    dispatch(
      routerRedux.push({
        pathname: '/other/agreement'
      })
    )
  }

  // 登录
  loginFn = () => {
    const { passwordWrong, username, password } = this.state
    if (!passwordWrong && username !== '' && password !== '') {
      passwordLogin({
        account: username,
        password,
        deviceToken: ''
      })
        .then(res => {
          const { dispatch } = this.props
          setCookie('ht_token', res.token)
          setCookie('UserName', res.uname)
          setCookie('UserFace', encodeURI(res.avatar)) // 同步登录头像
          setCookie('UserReName', res.nick)
          setCookie('catgory', res.catgory)
          setCookie('UserId', res.id)
          setCookie('ucId', res.ucId)
          setCookie('firstLogin', res.firstLogin)
          setCookie('UserMobile', res.mobile)
          if(getCookie("htzxUps")){
            var upData = decodeURIComponent(getCookie("htzxUps")); 
            var curUrl= JSON.parse(upData);
            curUrl.uid = res.mobile;
            setCookie("htzxUps",JSON.stringify(curUrl), 1, '.huatu.com')
          }
          dispatch({ type: 'all/checkIsLogin' })
          dispatch({ type: 'all/closeLogin' })
          if (typeof sensors !== 'undefined') {
            sensors.login(res.ucId)
          }
          // 接口401的情况
          if (getQueryStr('redirect')) {
            const url = decodeURIComponent(getQueryStr('redirect'))
            const params = url.split('?')[2]
            const getRuoter = url.split('?')[1]
            const query = {}
            if (params) {
              const vars = params.split('&')
              for (let i = 0; i < vars.length; i++) {
                const pair = vars[i].split('=')
                const [key, val] = pair
                query[key] = val
              }
            }
            dispatch(
              routerRedux.push({
                pathname: getRuoter.split('#')[1],
                search: qs.stringify(query)
              })
            )
          }
        })
        .catch(err => {
          Toast.info(err)
        })
    }
  }

  render() {
    const { passwordWrong } = this.state
    return (
      <div className={login.passwordLogin}>
        <div className={login.body}>
          <InputItem
            type="text"
            placeholder="请输入账号"
            className={login.phone}
            onFocus={() => this.clearError()}
            onChange={val => {
              this.setState({ username: val })
            }}
            clear
            ref={el => (this.inputRef = el)}
          >
            <i className={`iconfont iconshouji f36 ${login.icon}`} />
          </InputItem>
          {/* {usernameWrong ? (
            <p className={login.errorPhone}>请填写账号</p>
          ) : null} */}
        </div>
        <div className={login.body}>
          <InputItem
            type="password"
            onFocus={() => this.clearError()}
            onBlur={this.checkPassword}
            placeholder="请输入密码"
            className={login.phone}
            onChange={val => {
              this.setState({ password: val })
            }}
            ref={el => (this.passwordRef = el)}
            clear
          >
            <i className={`iconfont iconmima f36 ${login.icon}`} />
          </InputItem>
          {passwordWrong ? (
            <p className={login.errorPhone}>账号或密码错误，请重新输入</p>
          ) : null}
        </div>
        <p className={`${login.desc} f24`}>
          注册／登录即表示阅读并同意
          <span onClick={this.goAgreement}>《华图在线用户服务协议》</span>
        </p>
        <button
          type="button"
          className={`${login.loginBtn} f36`}
          onClick={this.loginFn}
        >
          登录
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  needLogin: state.all.needLogin
})

export default connect(mapState)(PasswordLogin)

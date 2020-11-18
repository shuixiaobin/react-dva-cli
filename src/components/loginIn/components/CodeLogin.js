import React from 'react'
import { connect } from 'dva'
import { loginIn, sendCode } from '@/services/javaApi'
import { routerRedux } from 'dva/router'
import { InputItem, Toast } from 'antd-mobile'
import login from '../loginIn.less'
import { CilckButton } from '@/utils/setSensors'
import { getQueryStr, getCookie, setCookie } from '@/utils/global'

class CodeLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneVal: '',
      codeVal: '',
      phoneWrong: false,
      codeWrong: false,
      timerDown: 60,
      isTimeDown: false,
      timerObj: null
    }
  }

  componentWillUnmount() {
    const { timerObj } = this.state
    clearTimeout(timerObj)
  }

  setIphone = (v, flag) =>
    // iphone遮挡小键盘
    // typeof timer !== 'undefined' && clearTimeout(timer)
    // var timer = setTimeout(() => {
    //   document.body.scrollTop = document.body.scrollHeight
    // }, 400)
    flag
      ? this.setState({
          phoneWrong: false
        })
      : this.setState({
          codeWrong: false
        })

  checkPhone = () => {
    const { phoneVal, timerObj } = this.state
    const TEL_REGEXP = /^[1]([3-9])[0-9]{9}$/
    if (!TEL_REGEXP.test(phoneVal) && phoneVal.length > 0) {
      this.setState({
        phoneWrong: true
      })
    }
    clearTimeout(timerObj)
    this.setState({
      timerDown: 60,
      isTimeDown: false,
      timerObj: null
    })
  }

  checkCode = data => {
    const TEL_REGEXP = /^\d{6}$/
    if (!TEL_REGEXP.test(data) && data.length > 0) {
      this.setState({
        codeWrong: true
      })
      return
    }
    this.setState({ codeVal: data })
  }

  // 登录
  loginIn = () => {
    CilckButton({
      on_page: '登录页',
      first_module: '登录弹框',
      button_name: '确认'
    })
    const { phoneWrong, codeWrong, phoneVal, codeVal } = this.state
    if (phoneWrong || codeWrong) return
    loginIn({
      deviceToken: 'mobile',
      account: phoneVal,
      captcha: codeVal,
      catgory: getCookie('catgory'),
      anonymousId:
        typeof sensors !== 'undefined' ? sensors.store.getDistinctId() : ''
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

  // 发送验证码
  sendYzCode = () => {
    CilckButton({
      on_page: '登录页',
      first_module: '登录弹框',
      button_name: '发送验证码'
    })
    if (this.state.isTimeDown || this.state.phoneWrong || !this.state.phoneVal)
      return
    sendCode(this.state.phoneVal)
      .then(() => {
        Toast.info('验证码已发送，请及时查收！')
        this.setState({ isTimeDown: true, timerObj: this.setTimerDown() })
      })
      .catch(err => {
        Toast.info(err)
      })
  }

  setTimerDown = () => {
    let total = 60
    return setInterval(() => {
      this.setState({
        timerDown: --total
      })
      if (total <= 0) {
        this.setState({
          isTimeDown: false,
          timerDown: 60
        })
        clearInterval(this.state.timerObj)
      }
    }, 1000)
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

  render() {
    const { phoneWrong, codeWrong, timerDown, isTimeDown } = this.state
    return (
      <div>
        <div className={login.body}>
          <InputItem
            type="number"
            onFocus={v => this.setIphone(v, 1)}
            onBlur={this.checkPhone}
            placeholder="请输入手机号"
            className={login.phone}
            onChange={v => {
              this.setState({ phoneVal: v })
            }}
            ref={el => (this.inputRef = el)}
            clear
          >
            <i className={`iconfont iconshouji f36 ${login.icon}`} />
          </InputItem>
          {phoneWrong ? (
            <p className={login.errorPhone}>请填写正确的手机号</p>
          ) : (
            ''
          )}
        </div>
        <div className={`${login.body} mt30`}>
          <div className={login.inputCode}>
            <InputItem
              type="number"
              onFocus={v => this.setIphone(v)}
              onBlur={v => {
                this.checkCode(v)
              }}
              maxLength="6"
              placeholder="输入6位验证码"
              ref={el => (this.inputRef = el)}
            >
              <i className={`iconfont iconyanzhengma f36 ${login.icon}`} />
            </InputItem>
            {codeWrong ? (
              <p className={login.errorCode}>验证码有误，请重新输入</p>
            ) : (
              ''
            )}
          </div>
          {isTimeDown ? (
            <div className={login.sendAgain}>{timerDown}s后可重发</div>
          ) : (
            <div onClick={this.sendYzCode} className={login.sendCode}>
              获取验证码
            </div>
          )}
        </div>
        <p className={`${login.desc} f24`}>
          <i className="mb10">未注册学员将自动注册</i>
          注册／登录即表示阅读并同意
          <span onClick={this.goAgreement}>《华图在线用户服务协议》</span>
        </p>
        <div className={login.footer} onClick={this.loginIn}>
          <p className={login.sure}>登录</p>
        </div>
      </div>
    )
  }
}

function mapState(state) {
  return {
    needLogin: state.all.needLogin
  }
}

export default connect(mapState)(CodeLogin)

import { connect } from 'dva'
import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import home from './home.less'
import { getQueryStr, setReferrer } from '@/utils/global'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line react/sort-comp
  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    // 储存前向来源
    setReferrer('首页')

  }

  toOtherRouter = e => {
    const { path } = closest(e.target, 'img').dataset
    const { dispatch } = this.props
    // 神策按钮埋点
    switch (path) {
      case '/other/noteEssence':
        CilckButton({
          on_page: '首页',
          first_module: '首页',
          button_name: '备考精华'
        })
        dispatch(
          routerRedux.push({
            pathname: path
          })
        )
        break
      case '/other/informationList':
        CilckButton({
          on_page: '首页',
          first_module: '首页',
          button_name: '热门咨询'
        })
        dispatch(
          routerRedux.push({
            pathname: path
          })
        )
        break
      case '/mk/':
        CilckButton({
          on_page: '首页',
          first_module: '首页',
          button_name: '模考大赛'
        })
        window.location.href = path
        break
      default:
        break
    }
  }



  render() {
    const { myUrl } = this.props

    return (
      <div id={home.homePage}>
        <div className={`${home.rmbk} container`} onClick={this.toOtherRouter}>
          <img data-path="/mk/" src={`${myUrl}mkds.png`} alt="模考大赛" />
          <img
            data-path="/other/informationList"
            src={`${myUrl}rmzx_02.png`}
            alt="热门资讯"
          />
          <img
            data-path="/other/noteEssence"
            src={`${myUrl}bkjh_02.png`}
            alt="备考精华"
          />
        </div>
        <div>
          <p>这是一个react脚手架</p>
        </div>

      </div>
    )
  }
}

const mapState = state => ({
  myUrl: state.all.myUrl,
  pageInfos: state.all.pageInfos
})

export default connect(mapState)(Home)

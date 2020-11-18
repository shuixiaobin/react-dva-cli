import { connect } from 'dva'
import React, { Component } from 'react'
import { Tabs, Toast } from 'antd-mobile'
import bar from './bar.less'
import { getCateList } from '@/services/globalService'
import barUtil from '@/utils/barUtil'

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      underlineLeft: '6.5%',
      barClass: '',
      barList: [], // Tabs 数据
      activeTabIndex: '', // Tabs activeTabIndex
      isScrollToTop: false // 首页是否滚动到顶部
    }
  }

  async componentDidMount() {
    const { fromSearch } = this.props
    try {
      let data = await getCateList()
      // 搜索课程结果页面添加全部选项
      if (fromSearch) {
        data = [{ name: '全部', cateKey: 10000 }, ...data]
      }
      const {
        pageInfos, // 离开前选择的类型
        location: { pathname }
      } = this.props
      const pageInfo = pageInfos[pathname] || ''

      this.setState(
        {
          barList: data.map(item => ({
            ...item,
            title: item.name
          }))
        },
        () => {
          // 如果缓存，直接滑到缓存 tab
          this.syncPageInfo(pageInfo)
        }
      )
    } catch (e) {
      Toast.fail(e)
    }

    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(nextProps) {
    const {
      pageInfos, // 离开前选择的类型
      location: { pathname }
    } = this.props

    const pageInfo = pageInfos[pathname] || ''

    if (nextProps.pageInfos[pathname]) {
      const { isBannerClick, cateKey } = nextProps.pageInfos[pathname]

      if (isBannerClick && pageInfo && pageInfo.cateKey !== cateKey) {
        // 首页轮播图点击，同步 tab
        this.syncPageInfo(nextProps.pageInfos[pathname])
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  // 同步 tab 当前项
  syncPageInfo = pageInfo => {
    let activeTabIndex = 0
    const { barList } = this.state
    let currentCate = barList[0]

    // 如果缓存，直接滑到缓存 tab 项
    if (pageInfo) {
      activeTabIndex = barList.findIndex(r => r.cateKey === pageInfo.cateKey)
      currentCate = pageInfo
    }

    this.resetClassList(currentCate, activeTabIndex)
  }

  handleScroll = () => {
    // 滚动条高度
    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.pageYOffset
    const dis = 200

    this.setState({
      isScrollToTop: scrollTop >= dis,
      barClass: scrollTop >= dis ? 'set-top' : ''
    })
  }

  resetClassList = ({ cateKey, name }, index) => {
    const {
      dispatch,
      location: { pathname }
    } = this.props

    // 设置偏移距离
    this.setState(
      {
        activeTabIndex: index,
        underlineLeft: `${barUtil.setUnderlineLeft(index) * 100}%`
      },
      () => {
        // 同步售前客服，回退选中项
        dispatch({
          type: 'all/SET_PAGE_INFO',
          payload: {
            path: pathname,
            param: {
              scrollTop: document.documentElement.scrollTop,
              cateKey,
              name,
              isBannerClick: false
            }
          }
        })
      }
    )
  }

  render() {
    const { underlineLeft, barClass, barList, activeTabIndex } = this.state
    const { children, fromSearch } = this.props
    const fromSearchUnderlineLeft = '3.7%'

    return (
      <div id="level_s-tab-bar" className={bar['level_s-tab-bar']}>
        <div className={`${bar.zw} ${barClass ? 'db' : 'dn'}`} />
        <div
          data-bar
          id={bar.barWrap}
          className={barClass ? bar[barClass] : null}
        >
          <div id="ht-tabs">
            <Tabs
              tabBarUnderlineStyle={{
                left: !fromSearch ? underlineLeft : fromSearchUnderlineLeft
              }}
              tabs={barList}
              renderTabBar={props => (
                <Tabs.DefaultTabBar
                  {...props}
                  activeTab={activeTabIndex}
                  onTabClick={this.resetClassList}
                />
              )}
            >
              {children}
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  pageInfos: state.all.pageInfos
})

export default connect(mapState)(Bar)

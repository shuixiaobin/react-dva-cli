import { connect } from 'dva'
import React, { Component } from 'react'
import { routerRedux } from 'dva/router'
import { Carousel, Toast } from 'antd-mobile'
import carousel from './carousel.less'
import { getmCarousel } from '@/services/javaApi'
import Lazyload from '@/components/lazyload/root'
import { CilckButton } from '@/utils/setSensors'

class CarouselSlide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getmCarousel()
  }

  componentWillUnmount() {
    this.setState({
      data: []
    })
  }

  // banner
  getmCarousel = async () => {
    try {
      const data = await getmCarousel()
      this.setState({
        data
      })
    } catch (e) {
      Toast.fail(e)
    }
  }

  /**
   * 外链：
   *
   * "ztk://h5/active": "H5活动页面"
   * "ztk://h5/simulate": "H5模考页面"
   * "ztk://course/seckill": "秒杀页面"
   */
  outTargetInfo = (target, query) => {
    let outUrl = ''

    const { dispatch, userName } = this.props

    const { url, subject, cateId, mId } = query

    switch (target) {
      // case 'ztk://h5/simulate':
      //   outUrl = `${模考大赛 URL}?subjectId=${subject}&categoryId=${cateId}`
      //   break
      case 'ztk://course/seckill':
        if (userName) {
          outUrl = `${SK_URL}${mId}.html`
        } else {
          dispatch({
            type: 'all/showLogin'
          })
          return
        }
        break
      default:
        outUrl = url
        break
    }

    window.location.href = outUrl
  }

  /**
   * 站内：
   *
   * 特殊页面处理
   */
  otherTargetInfo = (target, query) => {
    const { dispatch } = this.props

    switch (target) {
      case 'ztk://live/home':
        // 首页同步 bar
        dispatch({
          type: 'all/SET_PAGE_INFO',
          payload: {
            path: '/home',
            param: {
              scrollTop: document.documentElement.scrollTop,
              cateKey: query.cateId,
              name: query.cateName,
              isBannerClick: true
            }
          }
        })
        break
      default:
        break
    }
  }

  /**
   * 获取 query path
   *
   * "ztk://course/detail": "课程页面"
   * "ztk://live/home": "课程列表"
   * "ztk://course/collection": "课程合集列表"
   * "ztk://news/list": "资讯列表"
   * "ztk://news/detail": "资讯详情页"
   * "ztk://exam/articles": "备考精华"
   * "ztk://exam/articles/detail": "备考精华详情页"
   */
  getTargetInfo = (target, param) => {
    const { mId, mTitle, cateId, cateName, collageActiveId, rid ,isNew} = param
    const targetRouteMaps = {
      'ztk://live/home': { query: { cateId, cateName } },
      'ztk://course/detail': {
        query: {classId:mId,isNew:isNew > 0},
        path: '/class/classDetail'
      },
      'ztk://course/groupdetail': {
        query: { classId: rid, collageActiveId },
        path: '/class/groupClass'
      },
      'ztk://course/collection': {
        query: {
          collectId: mId,
          title: mTitle,
          fetchListApi: 'getCollectList'
        },
        path: '/other/collectList'
      },
      'ztk://news/list': { path: '/other/informationList' },
      'ztk://news/detail': {
        query: { id: mId },
        path: '/other/informationDetail'
      },
      'ztk://exam/articles': { path: '/other/noteEssence' },
      'ztk://exam/articles/detail': {
        query: { id: mId },
        path: '/other/noteEssenceDetail'
      }
    }

    return targetRouteMaps[target] || '' // 外链
  }

  go = (target, param) => () => {
    const { dispatch } = this.props
    const targetInfo = this.getTargetInfo(target, param) // target 对应路由
    console.log('targetInfo:', targetInfo)

    // 神策按钮埋点
    CilckButton({
      on_page: '首页',
      first_module: '首页轮播图',
      button_name: param.mTitle
    })

    if (targetInfo) {
      // 站内跳转
      if (targetInfo.path) {
        dispatch(
          routerRedux.push({
            pathname: targetInfo.path,
            search: qs.stringify(targetInfo.query)
          })
        )
      } else {
        // 特殊处理
        this.otherTargetInfo(target, targetInfo.query)
      }
    } else {
      // 外部链接
      this.outTargetInfo(target, param)
    }
  }

  render() {
    const { data } = this.state

    return data && data.length > 0 ? (
      <Carousel
        infinite
        autoplay
        className={`${carousel.carousel} container`}
        frameOverflow="hidden"
      >
        {data.map(({ mparams, target }) => (
          <div
            className={carousel.carousel_item}
            key={mparams.mId}
            data-mid={mparams.mId}
            data-mtitle={mparams.mTitle}
            onClick={this.go(target, mparams)}
          >
            <Lazyload
              lazy={mparams.phoneImageUrl}
              style={{ verticalAlign: 'top' }}
              alt="roundPhoto"
            />
          </div>
        ))}
      </Carousel>
    ) : null
  }
}

const mapState = state => ({
  userName: state.all.userName
})

export default connect(mapState)(CarouselSlide)

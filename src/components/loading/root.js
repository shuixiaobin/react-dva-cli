import React from 'react'
import { connect } from 'dva'
import styles from './loading.less'

const TIMER = 200
let timeoutId = null

class Loading extends React.Component {
  state = {
    show: false // loading在请求发生的TIMER时间后出现，如果请求很快，小于TIMER时间，那么就不显示loading
  }

  componentDidMount() {
    const { loading } = this.props
    if (loading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true
        })
      }, TIMER)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps

    this.setState({
      show: false
    })
    if (loading) {
      timeoutId = setTimeout(() => {
        this.setState({
          show: true
        })
      }, TIMER)
    }
  }

  componentWillUnmount() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  render() {
    const { loading, children, isListView } = this.props
    const { show } = this.state

    return (
      <div id="global_main-wrap">
        {children}

        {// eslint-disable-next-line no-nested-ternary
        !isListView ? (
          show && loading ? (
            <div className={`${styles.loading}`}>
              <div data-loader="circle-side" />
            </div>
          ) : null
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  myUrl: state.all.myUrl,
  loading: state.loading.global
})

export default connect(mapStateToProps)(Loading)

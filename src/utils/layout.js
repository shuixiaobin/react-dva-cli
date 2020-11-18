const layout = {}

// 解决键盘弹出后挡表单的问题
layout.scrollIntoView = () => {
  window.addEventListener('resize', () => {
    if (
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA'
    ) {
      window.setTimeout(() => {
        if ('scrollIntoView' in document.activeElement) {
          document.activeElement.scrollIntoView()
        } else {
          document.activeElement.scrollIntoViewIfNeeded()
        }
      }, 0)
    }
  })
}

export default layout

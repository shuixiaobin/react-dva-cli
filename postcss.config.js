// const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
// const postcssPxToViewport = require('postcss-px-to-viewport-opt');
// const postcssWriteSvg = require('postcss-write-svg');
// const postcssPresetEnv = require('postcss-preset-env');
// const postcssViewportUnits = require('postcss-viewport-units');
// const cssnano = require('cssnano');
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        'defaults',
        'not ie < 11',
        'last 2 versions',
        '> 1%',
        'iOS 7',
        'last 3 iOS versions'
      ]
    },
    'postcss-aspect-ratio-mini': {}, // 主要用来处理元素容器宽高比
    'postcss-write-svg': { utf8: false }, // 用来画1像素线
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      // viewportWidth: 1024, // pad
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines','.antd', '.ig_'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false ,// 允许在媒体查询中转换`px`
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    },
    cssnano: {
      'cssnano-preset-advanced': {
        zindex: false,
        autoprefixer: false
      }
    }
  }
}

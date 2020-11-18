const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.base.js')

const productionGzipExtensions = ['js', 'css']

const env = require('./env.config')

const webpackConfig ={
  cache: false,
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
    // chunkFilename: '[name].[hash:8].js',
    publicPath: './'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: path.join(__dirname, '/../dist/'),
      filename: 'css/style.[name].[hash:8].css',
      chunkFilename: 'css/style.[name].[chunkhash:8].css'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/static')
        }
      ],
      { ignore: ['index.html'] }
    ),
    new webpack.DefinePlugin({
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      COOKIE_DOMAIN: env.cookieDomain,
      BASE_URL: env.baseUrl,
      BASE_JAVA_URL: env.baseJavaUrl,
      SK_URL: env.skUrl,
      BUILD_ENV: `"${process.env.BUILD_ENV}"`,
      ENVURL: env.envUrl,
      PCURL: env.pcUrl
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionWebpackPlugin({
      // 打包gizp
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  mode: 'production'
}

if (process.env.npm_config_report) {
  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(commonConfig, webpackConfig)

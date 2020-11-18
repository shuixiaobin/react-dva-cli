const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const commonConfig = require('./webpack.base.js')
const env = require('./env.config')

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../hot'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../hot'),
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/' }]
    },
    hot: true,
    host: '0.0.0.0',
    port: env.port,
    open: true
  },
  plugins: [
    new CopyWebpackPlugin([
      // {from:path.resolve(__dirname,'../src/assets'),to:path.resolve(__dirname,'../hot/assets')},
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../hot/static')
      }
    ]),
    new webpack.DefinePlugin({
      NODE_ENV: `"${process.env.NODE_ENV}"`,
      COOKIE_DOMAIN: env.cookieDomain,
      BASE_URL: env.baseUrl,
      BASE_JAVA_URL: env.baseJavaUrl,
      SK_URL: env.skUrl,
      BUILD_ENV: `"${process.env.BUILD_ENV}"`,
      ENVURL: env.envUrl,
      PCURL: env.pcUrl
    })
  ]
})

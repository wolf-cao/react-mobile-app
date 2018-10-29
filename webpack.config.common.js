const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pxtorem = require('postcss-pxtorem')
const vConsolePlugin = require('vconsole-webpack-plugin')

// 自行配置
const routePreName = 'ReactMobileH5'

// 服务器配置
const ENVNODE = process.env.NODE_ENV

// 线下服务器 - 自行配置
let server = 'http://www.offline-url.com'
// mock服务器
if (ENVNODE === 'mockserver') {
  server = 'http://localhost:3000'
}
// 预发服务器 - 自行配置
if (!ENVNODE) {
  server = 'http://www.pro-server.com'
}
// 线上服务器 - 自行配置
if (ENVNODE === 'production') {
  server = 'https://www.online-url.com'
}

let plugins = [
  new CompressionPlugin(),
  new CleanWebpackPlugin([
    ENVNODE === 'production' || !ENVNODE ? routePreName : 'dist'
  ]),
  new HtmlWebpackPlugin({
    title: '',
    server,
    filename: 'index.html',
    template: './index.html',
    inject: true,
    chunks: ['manifest', 'vendor', 'app']
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css?_v=[chunkhash:8]',
    chunkFilename: '[name].css?_v=[chunkhash:8]'
  })
]

if (ENVNODE === 'mockserver' || ENVNODE === 'development') {
  plugins.push(new BundleAnalyzerPlugin())
  plugins.push(
    new vConsolePlugin({
      enable: true
    })
  )
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

if (ENVNODE === 'production' || !ENVNODE) {
  plugins.push(new UglifyJSPlugin())
}

const config = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js?_v=[hash]',
    path:
      ENVNODE === 'production' || !ENVNODE
        ? path.resolve(__dirname, routePreName)
        : path.resolve(__dirname, 'dist'),
    publicPath: ENVNODE === 'production' || !ENVNODE ? `/${routePreName}/` : '/'
  },
  plugins,
  resolve: {
    alias: {
      react: 'react/cjs/react.production.min.js',
      'react-dom': 'react-dom/cjs/react-dom.production.min.js'
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                pxtorem({
                  rootValue: 100,
                  propWhiteList: []
                }),
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    'iOS >= 7',
                    'Android >= 4',
                    '>1%',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  }
}

module.exports = config

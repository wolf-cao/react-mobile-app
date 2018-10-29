const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const developConfig = require('./webpack.config.development.js')
const proConfig = require('./webpack.config.pro.js')
const productionConfig = require('./webpack.config.production.js')

let config = {}
const ENVNODE = process.env.NODE_ENV

if (ENVNODE === 'development' || ENVNODE === 'mockserver') {
  config = merge(common, developConfig)
}

if (!ENVNODE) {
  config = merge(common, proConfig)
}

if (ENVNODE === 'production') {
  config = merge(common, productionConfig)
}

module.exports = config

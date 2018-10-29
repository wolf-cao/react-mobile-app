const config = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: '../dist',
    port: 8000,
    host: '0.0.0.0',
    openPage: 'ReactMobileH5'
  }
}

module.exports = config

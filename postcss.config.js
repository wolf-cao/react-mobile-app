module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4', '>1%', 'Firefox ESR', 'not ie < 9']
    })
  ]
}

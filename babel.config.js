module.exports = {
  sourceMaps: true,
  plugins: [
    ['transform-class-properties'],
    [
      'import',
      {
        libraryName: 'pf-component',
        style: true,
        camel2DashComponentName: false
      }
    ]
  ],
  presets: [
    ['@babel/preset-react'],
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11'
        },
        useBuiltIns: 'entry',
        corejs: '3',
        debug: false
      }
    ]
  ],
  ignore: ['node_modules']
}

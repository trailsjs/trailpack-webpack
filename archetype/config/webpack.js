const path = require('path')

module.exports = {
  options: {
    resolve: {
      root: path.join(__dirname, '../')
    },
    entry: [
      './src/index'
    ],
    output: {
      path: path.join(__dirname, '../../../dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }]
    }
  }
}

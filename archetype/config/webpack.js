const path = require('path');

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
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }]
    }
  }
};

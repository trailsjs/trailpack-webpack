# trailpack-webpack
:package: Webpack Trailpack. 

Webpack asset pipeline trailpack for Trails.

## 1. Install
```sh
$ npm install trailpack-webpack --save
```

## 2. Configure

### a. Set your environment.

By default, Trails ([and express](http://stackoverflow.com/a/16979503/291180)) sets `NODE_ENV=development`.
In this setting, webpack will watch for changes in the directories you specify in your `config/webpack.js`.


| `NODE_ENV` | webpack mode | description |
|:---|:---|:---|
| `development` | [`webpack.watch()`](https://webpack.github.io/docs/configuration.html#watch) | Rebuilds on file changes during runtime |
| `staging` or `production` | `webpack.run()` | Build bundle once on load. |

### b. Configure Webpack

This trailpack includes basic [Webpack Configuration](https://webpack.github.io/docs/configuration.html).
Below is a more complete example of using webpack to compile a [React.js](https://facebook.github.io/react/) application located in `assets/js/`.

```js
// config/webpack.js
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
          presets: ['react', 'es2015', 'stage-0']
        }
      }, {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass'
        ]
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
```

## 3. Start!

```sh
$ npm start
```

## License
MIT

## Maintained By

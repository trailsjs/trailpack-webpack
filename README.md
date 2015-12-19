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

This trailpack uses standard [Webpack Configuration](https://webpack.github.io/docs/configuration.html).
Below is an example of using webpack to compile a [React.js](https://facebook.github.io/react/) application located in `assets/js/`.

```js
// config/webpack.js

var webpack = require('webpack');

// compile js assets into a single bundle file
module.exports.webpack = {
  options: {
    devtool: 'eval',
    entry: [
      './assets/js',
    ],
    output: {
      path: path.resolve(__dirname, '.tmp/public/js'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        { test: /\.js$/, loaders: ['babel-loader?stage=0'] },
        { test: /\.css$/, loader: 'style!css' }
      ]
    }
  },

  // docs: https://webpack.github.io/docs/node.js-api.html#compiler
  watchOptions: {
    aggregateTimeout: 300
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

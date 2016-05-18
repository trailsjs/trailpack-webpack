# trailpack-webpack

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Linux + OSX Build Status][ci-image]][ci-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Follow @trailsjs on Twitter][twitter-image]][twitter-url]

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

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trails/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

[trails-image]: http://i.imgur.com/zfT2NEv.png
[trails-url]: http://trailsjs.io
[npm-image]: https://img.shields.io/npm/v/trailpack-webpack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-webpack
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-webpack.svg?style=flat-square&label=Linux%20/%20OSX
[ci-url]: https://travis-ci.org/trailsjs/trailpack-webpack
[appveyor-image]: https://img.shields.io/appveyor/ci/trailsjs/trailpack-webpack/master.svg?style=flat-square&label=Windows
[appveyor-url]: https://ci.appveyor.com/project/trailsjs/trailpack-webpack
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-webpack.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-webpack
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails
[twitter-image]: https://img.shields.io/twitter/follow/trailsjs.svg?style=social
[twitter-url]: https://twitter.com/trailsjs

'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')
const webpack = require('webpack')

/**
 * Webpack Trailpack
 *
 * @class Webpack
 *
 * Use Webpack in your Trails application
 */
module.exports = class Webpack extends Trailpack {

  /**
   * Ensure that config/webpack is valid
   */
  validate() {
    const config = this.app.config
    const logger = this.app.config.log.logger

    if (!config.webpack) {
      logger.warn('trailpack-webpack: no webpack config defined.')
      logger.warn('trailpack-webpack: Please configure config/webpack.js')
    }
    return Promise.resolve()
  }

  configure () {
    return new Promise((resolve, reject) => {
      this.webpack = webpack(_.cloneDeep(this.app.config.webpack), (err, stats) => {
        if (err) return reject(err)

        this.log.silly('webpack configure:', stats.toString())

        return resolve()
      })
    })
  }

  /**
   * Start Webpack
   */
  initialize() {
    this.log.info('trailpack-webpack: webpack loaded.')

    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV == 'development') {
        this.log.info('trailpack-webpack: watching...')
        this.watcher = this.webpack.watch({ }, (err, stats) => {
          if (err) reject(err)

          this.afterBuild(stats)
          resolve()
        })
      }
      else {
        this.log.info('trailpack-webpack: building...')
        this.webpack.run((err, stats) => {
          if (err) reject(err)

          this.afterBuild(stats)
          resolve()
        })
      }
    })
  }

  afterBuild(rawStats) {
    this.log.info('trailpack-webpack: Build Info\n' + rawStats.toString({
      colors: true,
      chunks: false
    }))
  }

  unload () {
    if (!this.watcher) return

    return new Promise((resolve, reject) => {
      this.watcher.close(() => resolve())
    })
  }

  constructor(app, config) {
    super(app, {
      config: require('./config'),
      pkg: require('./package')
    })
  }

}

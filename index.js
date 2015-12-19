/**
 * Created by jaumard on 16/12/2015.
 */
'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')
const webpack = require('webpack')

/**
 * Webpack Trailpack
 *
 * @class Webpack
 * @see {@link http://trailsjs.io/doc/trailpack
 *
 * Generate asset with Webpack.js
 */
module.exports = class Webpack extends Trailpack {

    /**
     * Ensure that config/webpack is valid
     */
    validate() {
	    let config = this.app.config
	    const logger = this.app.config.log.logger

	    if (!config.webpack.options) {
		    logger.warn('trailspack-webpack: no Webpack "options" are defined.')
		    logger.warn('trailspack-webpack: Please configure config/webpack.js')
	    }
        return Promise.resolve()
    }

    /**
     * Start Webpack
     */
    initialize() {
	    const logger = this.app.config.log.logger
	    return new Promise((resolve, reject) => {
		    this.compiler = webpack(this.app.config.webpack.options, (err, stats) => {
			    if (err) return reject(err)

			    logger.info('trailspack-webpack: compiler loaded.')
			    logger.silly('trailspack-webpack: ', stats.toString())

			    if (process.env.NODE_ENV == 'development') {
				    logger.info('trailspack-webpack: watching...')
				    this.compiler.watch(_.extend({ }, this.app.config.webpack.watchOptions), this.afterBuild.bind(this))
			    }
			    else {
				    logger.info('trailspack-webpack: running...')
				    this.compiler.run(this.afterBuild.bind(this))
			    }
			    resolve()
		    })
	    })
    }

	afterBuild (err, rawStats) {
		const logger = this.app.config.log.logger
		if (err) return logger.error('trailspack-webpack: FATAL ERROR', err)

		let stats = rawStats.toJson()

		logger.debug('trailspack-webpack: Build Info\n' + rawStats.toString({
				colors: true,
				chunks: false
			}))

		if (stats.errors.length > 0) {
			logger.error('trailspack-webpack:', stats.errors)
		}
		if (stats.warnings.length > 0) {
			logger.warn('trailspack-webpack:', stats.warnings)
		}
	}

    constructor(app, config) {
        super(app, {
            config: require('./config'),
            pkg: require('./package')
        })
    }

}

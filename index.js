/**
 * Created by jaumard on 16/12/2015.
 */
'use strict'

const Trailpack = require('trailpack')
const lib = require('./lib')
const _ = require('lodash')

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

        return Promise.resolve()
    }

    /**
     * Start Webpack
     */
    initialize() {
        return lib.Webpack.init(this.app.config.webpack)
    }

    constructor(app, config) {
        super(app, {
            config: require('./config'),
            pkg: require('./package')
        })
    }

}

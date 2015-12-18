/**
 * Created by jaumard on 16/12/2015.
 */
'use strict'

const webpack = require('webpack');

module.exports = {

	init (config) {
		return new Promise((resolve, reject) => {
			webpack(config, function(err, stats) {
				if (err) return reject(err)

				resolve()
			});
		})
	}
}

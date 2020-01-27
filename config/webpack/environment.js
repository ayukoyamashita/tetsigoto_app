const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
environment.plugins.prepend('Provide',
	new webpack.ProvidePlugin({
		jsQR: 'jsqr'
	})
)
module.exports = environment

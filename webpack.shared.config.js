const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
	mode: ('production' === process.env.NODE_ENV ? 'production' : 'development'),
	module: {
		rules: [
			{
				test: /\.js|jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: [/\.js?$/, /\.jsx?$/],
				enforce: 'pre',
				exclude: /node_modules/,
				use: ['source-map-loader'],
			},
		],
	},
	plugins: [
  	new SourceMapDevToolPlugin({
    	filename: "[file].map"
  	}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
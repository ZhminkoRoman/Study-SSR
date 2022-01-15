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
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.js', 'jsx', '.sass', '.scss'],
	},
}
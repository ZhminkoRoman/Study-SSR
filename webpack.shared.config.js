module.exports = {
    mode: ('production' === process.env.NODE_ENV ? 'production' : 'development'),
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.less'],
    },
}
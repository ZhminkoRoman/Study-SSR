const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const sharedConfig = require('./webpack.shared.config.js');

let config = {
    target: 'node',

    entry: './server/index.js',

    output: {
        path: path.join(__dirname, './build/server'), 
        filename: 'bundle.js',
    },

    externals: [webpackNodeExternals()],

    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                'css-loader',
                'sass-loader'
            ]
        }],
    },
};

module.exports = merge(sharedConfig, config);
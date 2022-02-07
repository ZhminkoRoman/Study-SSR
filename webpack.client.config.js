const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
const sharedConfig = require('./webpack.shared.config.js');
require('babel-polyfill');
const clientPort = 3001;

const config = {
  target: 'web',

  entry: ['babel-polyfill', './client/index.js'],

  output: {
    path: path.join(__dirname, './build/client'),
    filename: 'scripts/bundle.js',
    publicPath: `http://localhost:${clientPort}/`,
  },

  devtool: "source-map",

  devServer: {
    port: clientPort,
    liveReload: true
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css',
    }),
  ],
};

module.exports = merge(sharedConfig, config);
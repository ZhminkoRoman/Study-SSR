const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
const sharedConfig = require('./webpack.shared.config.js');

const clientPort = 8080;

const config = {
  target: 'web',

  entry: './client/index.js',

  output: {
    path: path.join(__dirname, './build/client'),
    filename: 'scripts/bundle.js',
    publicPath: `http://localhost:${clientPort}/`,
  },

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
              modules: {
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: false,
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
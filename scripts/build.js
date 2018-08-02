'use strict'

const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('../config/webpack.config.prod');

process.env.Node_ENV = 'production';

const build = merge(config, {
  devtool: '#source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        Node_ENV: '"production"'
      }
    })
  ]
});

let compiler = webpack(build);
console.log(compiler);
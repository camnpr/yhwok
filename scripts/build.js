'use strict'

const webpack = require('webpack');
const config = require('../config/webpack.config.prod');

process.env.Node_ENV = 'production';

let compiler = webpack(config);

console.log(compiler);
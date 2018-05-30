'use strict'

const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
// 从中提取文本到单独的文件中。common
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

// TODO：传入进来，方便打包CND等路径。
const publicPath = '/';

module.exports = {
  bail: true,
  entry: {
    index: [
      './src/index.js',
    ],
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js',
    publicPath: publicPath,
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', 'tsx'],
  },
  resolveLoader: {
    // root: paths.ownNodeModules,
    // moduleTemplates: ['*-loader'],
    modules: [
      paths.appNodeModulesOwn, // 优先使用自定义的module来提供loader
      'node_modules'
    ],
    moduleExtensions: ["-loader"]
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss'
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?importLoaders=1!postcss'
        ),
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/[name].[hash:8].[ext]'
        }
      }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        // https://github.com/postcss/postcss/blob/master/README-cn.md
        postcss: function() {
          return [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // react/vue not support IE8
              ]
            }),
          ]
        },
      }
    }),
    // 通过配置了DefinePlugin，那么这里面的标识就相当于全局变量，你的业务代码可以直接使用配置的标识。
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV,
      },
    }),
    // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 打包的时候删除重复或者相似的文件
    // new webpack.optimize.DedupePlugin(), // DedupePlugin: This plugin was removed from webpack. Remove it from your configuration.
    // https://segmentfault.com/a/1190000008995453 配置说明
    new webpack.optimize.UglifyJsPlugin({
      // 压缩
      compress: {
        // 是否要支持IE6/7/8。UglifyJS默认不兼容IE。
        screw_ie8: true, // react/vue not support IE8
        warnings: false
      },
      // 代码混淆
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false, // 取消注释
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
};
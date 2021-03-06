'use strict'

const path = require('path');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

const publicPath = '/';

module.exports = {
  // 选一个开发工具来加快调试
  devtool: 'cheap-module-source-map', // 没有映射的sourcemap，sourcemap就简单的映射到每一行。
  // 包的入口，可字符串"" 或 数组[](所有模块都会启动，但最后一个会被导出) 或 {}多页
  entry: {
    index: [
      // require.resolve('webpack-dev-server/client'),
      // or
      // requrie.resolve('webpack/hot/dev-server')
      // or
      require.resolve('react-dev-utils/webpackHotDevClient'), // 相当于上边的，但是，提供了展示语法错误的功能。需webpack@3支持
      './src/index.js',
    ]
  },
  // 编译后输出配置
  output: {
    // publicPath: "http://cdn.com/", // <script/link..链接到不同的主机或者CDN上
    path: paths.appBuild, // 导出目录
    filename: '[name].js', // [name] 替换为模块名，还可+ [hash]
    pathinfo: true,
    publicPath: publicPath,
  },
  // 影响模块的解决方案
  resolve: {
    // 一个包含模块扩展名的数组。例如，为了发现CoffeeScript 文件，你的数组应该包含字符串".coffee"。
    // webpack 1.x默认是：["", ".webpack.js", ".web.js", ".js"]，如果设置，表示覆盖了默认的，意味着webpack不再用默认扩展名查找模块
    // webpack 1.x如果你想正确加载一个带有扩展名的模块，你必须把一个空字符串放在你的数组里。
    extensions: ['.js', '.json', '.jsx', '.ts', 'tsx'], // webpack 3.x 不能有空字符串
  },
  // 和resolve很像，只是，这个针对：loader
  resolveLoader: {
    // root: 定义，包含你的模块的目录（绝对路径）
    // root: paths.appNodeModulesOwn, // 自定义node模块，优先。
    // moduleTemplates: ['*-loader'], // 描述了尝试的模块名称的替代名  webpack 1.x 有效。
    modules: [
      paths.appNodeModulesOwn, // 优先使用自定义的module来提供loader解析
      'node_modules'
    ],
    moduleExtensions: ["-loader"]
  },
  // 模块的配置
  module: {
    // 一个自动运行的loader数组，每一个数组项，都可以有：test,exclude,include,loader,loaders,等条件项
    rules: [
      {
        // 一个排查的条件
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        // 一个用"!"隔开loader的字符串
        loader: 'url', // 其实是：url-loader，由于上边的：resolveLoader 配置了，因此不用写全。
        // 向loader传递额外的条件选项
        query: {
          limit: 10000,  //单位byte， 相当于： loader: 'url-loader?limit=10000'
          name: 'static/[name].[hash:8].[ext]',
        },
      },
      {
        // 必须满足的条件匹配
        test: /\.(js|jsx)$/,
        // 指定：要用loader转换的文件路径数组
        include: paths.appSrc,
        loader: 'babel',
      },
      {
        test: /\.vue$/,
        include: paths.appSrc,
        loader: 'vue',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // 多个loader用!分隔，从右往左执行
        loader: 'style!css?importLoaders=1&modules&localIdentName=[local]___[hash:base64:5]!postcss',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css?importLoaders=1!postcss',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]', // 输出文件名的配置
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.svg$/,
        loader: 'file',
        options: {
          name: 'static/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 用到production环境（webpack-merge...)
    // .pwarc.js文件里的 manifest 节点
    new ManifestPlugin({
      // writeToFileEmit: true, // 
      seed: {
        name: 'YHWOK Demo',
        short_name: 'YHWOK',
        description: 'this is a simple manifest intro',
        version_name: 'beta',
        icons: [
            {
                "src": "/pwa/img/46.png",
                "sizes": "46X46",
                "type": "image/png"
            }
        ],
        background_color: "#fff",
        theme_color: "#000",
        start_url: "/",
        display: "standalone",
        orientation: "portrait"
      }
    }),
    new SWPrecachePlugin({
      cacheId: 'yhwok-sw-precache-wepack-plugin', // service worker cache的唯一名字， 非必须，默认：sw-precache-wepack-plugin
      filename: 'yhwok-service-worker.js', // 
      minify: true, // 压缩 service-worker.js
      staticFileGlobs: [
        'public/assets/**.*',
        'public/*.html',
        '/favicon.ico'
      ],
      navigateFallback: publicPath + 'index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
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
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': process.env.NODE_ENV,
    //   },
    // }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: 'public/index.html'
    }), // 生成默认的index.html
    new webpack.BannerPlugin(
      '// yhwok CLI is running \n'
      + '(function() {'
      + ' if("serviceWorker" in navigator) {'
      + '  navigator.serviceWorker.register("/yhwok-service-worker.js");'
      + ' }'
      + '})();'
    ),// 添加标头信息。
    // new webpack.HotModuleReplacementPlugin(), // 启动热加载，相当于： hot: true
    new CaseSensitivePathsPlugin(), // 兼容路径大小写 OSX WIN
    new WatchMissingNodeModulesPlugin(paths.appNodeModules), // 校验node modules
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
};
'use strict'

// 探测端口是否可用
const detect = require('detect-port');
const clearConsole = require('react-dev-utils/clearConsole');
// 根据端口获取当前运行的进程对象process
const getProcessForPort = require('react-dev-utils/getProcessForPort');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
// nodejs 提供 open 库，也可以用这个。
const openBrowser = require('react-dev-utils/openBrowser');
// 用户命令行中的常用交互集合
const inquirer = require('inquirer');
const webpack = require('webpack');
// 是一个中间件，可以写到app.use(...)，针对SPA页面，可以重写URL（解决刷新404问题）等。
const historyApiFallback = require('connect-history-api-fallback');
// node代理的中间件，usage: app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// const httpProxyMiddleware = require('http-proxy-middleware');
const WebpackDevServer = require('webpack-dev-server');
// 粉笔，终端字符串样式，usage: chalk.red('red color');
const chalk = require('chalk');
const config = require('../config/webpack.config.dev');
const paths = require('../config/paths')

process.env.NODE_ENV = 'development';

const DEFAULT_PORT = process.env.PORT || 3000;
// stdout:标注输出流。   isTTY 来判断当前是否处于TTY上下文
const isInteractive = process.stdout.isTTY;
let compiler;

function setupCompiler(host, port, protocol) {
  compiler = webpack(config);

  compiler.plugin('invalid', function() {
    // 是否在交互
    if(isInteractive) {
      clearConsole();
    }
    console.log('Compiling...')
  });

  let isFirstCompile = true;
  
  compiler.plugin('done', function(stats) {
    if (isInteractive) {
      clearConsole();
    }

    // 从stats中提取美化警告和错误信息。
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSucessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSucessful && (isInteractive || isFirstCompile);

    if (isSucessful) {
      console.log(chalk.green('Compiled successfully! yhwok'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
      console.log();
      isFirstCompile = false;
    }

    // 如果错误存在，就展示
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // 如果没有错误，展示警告
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });

      // ESLint的一些技巧
      console.log('You may use special comments to disable some warning.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

function addMiddleware(devServer) {
  const proxy = require(paths.appPackageJson).proxy;
  devServer.use(historyApiFallback({
    disableDotRule: true,
    htmlAcceptHeaders: proxy ?
      ['text/html'] :
      ['text/html', '*/*']
  }));
  // TODO: proxy index.html,...
  devServer.use(devServer.middleware);
}

function runDevServer(host, port, protocol) {
  console.log('runDevServer...a...');
  const devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: protocol === 'https',
    host: host
  });

  console.log('runDevServer...b...');
  addMiddleware(devServer);
  console.log('runDevServer...c...');

  devServer.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();

    if (isInteractive) {
      openBrowser(protocol + '://' + host + ':' + port + '/');
    }
  });
  console.log('runDevServer...d...');
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

console.log('x', DEFAULT_PORT);
detect(DEFAULT_PORT).then((port) => {
  console.log('xx', port, DEFAULT_PORT);
  if (port === DEFAULT_PORT) {
    run(port);
    return;
  }

  if (isInteractive) {
    clearConsole();
    const existingProcess = getProcessForPort(DEFAULT_PORT);
    const question = 
      chalk.yellow('Something is already running on port ' + DEFAULT_PORT + '.'
        + ((existingProcess ? 'Probably:\n  ' + existingProcess : ''))
        + '\n\nWould you like to run the app on another port instead?'
      );

    inquirer([question]).then(shouldChangePort => {
      if (shouldChangePort) {
        run(port);
      }
    })
  } else {
    console.log(chalk.red(`Something is already running on port ${DEFAULT_PORT}`));
  }
})

'use strict'

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn'); // or commander
const updateNotifier = require('update-notifier');
const home = require('user-home'); // 获取用户主目录的路径，window：c:\user\username\  osx: '/Users/username'

const script = process.argv[2];
const args = process.argv.slice(3);
// const opn = require('opn'); // A better node-open. Opens stuff like websites, files, executables. Cross-platform.
const pkg = require('../package.json');
const appPaths = require('../config/paths');
const init = require('../config/init');

// view usage guide
if (process.argv.length <= 2) {
  console.log(chalk.green(`
    Usage: yhwok <command>

    where <command> is one of:

      -v, --version  show version
      -h, --help     show help
      -i, --init     init project (simple, weex, vue, react)
      --server      run server(mock data, vconsole)
      --build       build project
  `));
  process.exit(1);
}

// check `yhwok` update version
updateNotifier({pkg}).notify();

switch(script) {
  case '-h':
  case 'help':

    console.log(chalk.gray(`
      CLI Path：${__dirname}
      Run Path: ${process.cwd()}
      User Path: ${home}
      --------------------------------------------
      Command Method: ${script}
      Command Params: ${args}
      --------------------------------------------
      Path Config: ${JSON.stringify(appPaths).replace(/[,|{|}]/g, '\n')}
    `));
    break;
  case '-v':
  case 'version':

    console.log('yhwok-cli version ' + chalk.cyan(pkg.version));
    break;
  case '-i':
  case 'init':

    init.pick();
    break;
  case 'build':
  case 'server':

    console.log("https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js");
    console.log("mobile debug use 'vconsole'");
    console.log("--------------------------------------------------------------------")

    let result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    console.log(chalk.yellow(JSON.stringify(result), result.status));
    process.exit(result.status);
    break;
  case '-w':
  case 'weex':   // e.g : yhwok weex create   // args：create

    let weex = spawn.sync(
      'weex',
      [].concat(args),
      { stdio: 'inherit' }
    );
    console.log(chalk.yellow(weex, weex.status));
    process.exit(weex.status);
    break;
  default:

    console.log(chalk.red(`Unknown command method: ${script}.`));
    break;
};

// opn("http://www.baidu.com")

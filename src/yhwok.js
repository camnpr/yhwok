'use strict'

const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const updateNotifier = require('update-notifier');
const exists = require('fs').existsSync;
const rm = require('rimraf').sync;
const ora = require('ora');
const home = require('user-home'); // 获取用户主目录的路径，window：c:\user\username\  osx: '/Users/username'
const download = require('download-git-repo');
const script = process.argv[2];
const args = process.argv.slice(3);
// const opn = require('opn'); // A better node-open. Opens stuff like websites, files, executables. Cross-platform.
const pkg = require('../package.json');
const appPaths = require('../config/paths');

switch(script) {
  case '-h':
  case '-help':
  case 'help':
    console.log(chalk.gray(__dirname, process.cwd(), home));
    console.log();
    console.log(chalk.gray(`script:${script}.`));
    console.log();
    console.log(chalk.gray(`args:${args}`));
    console.log();
    console.log(chalk.gray(JSON.stringify(appPaths).replace(/\,/g, '\n')));
    console.log();
    break;
  case '-v':
  case '-version':
  case 'version':
    console.log('yhwok-cli version ' + chalk.cyan(pkg.version));
    // check `yhwok` update version
    updateNotifier({pkg}).notify();
    break;
  case 'init':
    // Temporary use:
    let template = 'camnpr/jsFrameWork';
    let target = 'test'; // current path under
    const spinner = ora(`Downloading template from ${template} repo`);
    spinner.start();
    // Remove if local template exists
    if (exists(target)) rm(target);
    // 本地 gitlab 有权限问题，待测，目前用github仓库
    download(template, target, function (err) {
      spinner.stop();
      console.log(err ? chalk.red('init project files is Error!') : chalk.green('Success Create project files!'));
    });
    /*
    if (fs.existsSync(target)) {
      inquirer.prompt([{
        type: 'confirm',
        message: 'Target directory exists. Continue?',
        name: 'ok'
      }]).then(answers => {
        if (answers.ok) {
          create(target, rawName, template, events, options);
        }
      }).catch(logger.error)
    } else {
      create(target, rawName, template, events, options);
    }
    */
    break;
  case 'build':
  case 'server':
    let result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    console.log(chalk.yellow(JSON.stringify(result), result.status));
    process.exit(result.status);
    break;
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
    console.log(chalk.red(`Unknown script ${script}.`));
    break;
};

// opn("http://www.baidu.com")

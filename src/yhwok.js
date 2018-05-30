'use strict'

// https://www.cnblogs.com/buzhiqianduan/p/7655612.html

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const script = process.argv[2];
const args = process.argv.slice(3);
// const opn = require('opn'); // A better node-open. Opens stuff like websites, files, executables. Cross-platform.
const appPaths = require('../config/paths');
const pkgJSON = require(appPaths.appPackageJson);


console.log(__dirname, process.cwd(), fs.realpathSync(process.cwd()));
console.log(chalk.gray(`script:${script}.`));
console.log();
console.log(chalk.gray(`args:${args}`));
console.log();
console.log(appPaths);
console.log(path.resolve('public/index.html'));
console.log(chalk.red('------------------------------------------------------------------'))

switch(script) {
  case 'version':
    console.log(chalk.cyan(pkgJSON.version));
    break;
  case 'build':
  case 'server':
    const result = spawn.sync(
      'node',
      [require.resolve(`../scripts/${script}`)].concat(args),
      { stdio: 'inherit' }
    );
    console.log(chalk.yellow(result, result.status));
    process.exit(result.status);
    break;
  default:
    console.log(chalk.red(`Unknown script ${script}.`));
    break;
};

// opn("http://www.baidu.com")

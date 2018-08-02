/**
 * Copyright (c) 2018-present yhwok Holding Limited
 * @author yhw <admin@yhw.com>
 */

const chalk = require('chalk');
const exists = require('fs').existsSync;
const download = require('download-git-repo');
const ora = require('ora'); // 命令行动画
const inquirer = require('inquirer'); // 问答 prompt
const shell = require('shelljs');
const path = require('./paths');

function downloadTemplate(template) {
  // Temporary use:
  // let template = 'camnpr/jsFrameWork';
  let target = process.argv.slice(3).join('') || 'projectName'; // current path under
  const spinner = ora(`Downloading template from ${template} repo`);
  spinner.start();
  // Remove if local template exists
  if (exists(target)) shell.rm('-rf', target);
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
}

exports.pick = async function (opts) {
  opts = opts || {};
  let answer = await inquirer.prompt({
    name: "selected",
    type: "list",
    message: opts.message || "Found 2 templates (Use arrow keys)",
    choices: opts.choices || [
      "Simple", 
      "Motion",
      new inquirer.Separator(), 
      "Weex",
      "Wechat",
      new inquirer.Separator(),
      "Vue",
      "React"
    ]
  });
  
  switch(answer.selected) {
    case 'Simple':
      // downloadTemplate("benjycui/bisheng");
      let deleteTips = await inquirer.prompt({
        name: "SimpleRF",
        type: "text",
        message: "begin DELETE current folder of All Files, are you OK? [Y/N]",
      });
      if (deleteTips.SimpleRF == "Y") {
        shell.rm('-rf', path.resolveApp('./'));
      } else {
        console.log(chalk.gray('current is append thing!'));
      }
      shell.cp('-R',  path.resolveOwn('../template/*'), path.resolveApp('./'));
      shell.cp('-R',  path.resolveOwn('../template/.editorconfig'), path.resolveApp('./'));
      shell.cp('-R',  path.resolveOwn('../template/.yhwokrc.mock.js'), path.resolveApp('./'));
      shell.cp('-R',  path.resolveOwn('../template/.webpackrc.js'), path.resolveApp('./'));
      shell.cp('-R',  path.resolveOwn('../template/.pwarc.js'), path.resolveApp('./'));
      shell.cp('-R',  path.resolveOwn('../template/package.json'), path.resolveApp('./'));
      break;
    case 'Motion':
      downloadTemplate("camnpr/yhwok-web");
      break;
    case 'Weex':
      downloadTemplate("camnpr/yhwok-weex");
      break;
    case 'Wechat':
      downloadTemplate("Tencent/wepy");
      break;
    case 'Vue':
      downloadTemplate("bailicangdu/vue2-happyfri");
      break;
    case 'React':
      downloadTemplate("duxianwei520/react");
      break;
    default:
      console.log(chalk.yellow('do not anything!'))
      break;
  }
}
/**
 * Copyright (c) 2018-present yhwok Holding Limited
 * @author yhw <admin@yhw.com>
 */

const chalk = require('chalk');
const exists = require('fs').existsSync;
const rm = require('rimraf').sync;
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');

function downloadTemplate(template) {
  // Temporary use:
  // let template = 'camnpr/jsFrameWork';
  let target = process.argv.slice(3).join('') || 'projectName'; // current path under
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
}

exports.pick = async function (opts) {
  opts = opts || {};
  let answer = await inquirer.prompt({
    name: "selected",
    type: "list",
    message: opts.message || "Found 2 templates (Use arrow keys)",
    choices: opts.choices || [
      "Simple", 
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
      downloadTemplate("benjycui/bisheng");
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
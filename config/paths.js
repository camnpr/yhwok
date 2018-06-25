'use strict'

const path = require('path');
const fs = require('fs');

// process.cwd() 是当前Node.js进程执行时的工作目录
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function resolveOwn(relativePath) {
  // __dirname  是当前模块的目录名
  return path.resolve(__dirname, relativePath);
}

// 定义文件路径
module.exports = {
  appBuild: resolveApp('dist'), // 打包输出目录
  appPublic: resolveApp('public'), // 公共资源目录，会复制到打包目录
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'), // 源码目录，待构建
  appNodeModules: resolveApp('node_modules'), // 通用的node modules
  appNodeModulesOwn: resolveOwn('../node_modules'), // 私有的node modules
  appPackageJsonOwn: resolveOwn('../package.json'),
  resolveApp,
  resolveOwn,
};
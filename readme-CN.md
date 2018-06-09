![image | left](https://img.shields.io/badge/PRs-welcome-brightgreen.svg "")
![image | left](https://img.shields.io/github/license/mashape/apistatus.svg "")
[![NPM version](https://img.shields.io/npm/v/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![NPM downloads](http://img.shields.io/npm/dm/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### yhwok

yhwok是一个前端构建和工程化工具。 [English](readme.md)

### 安装

使用npm方式:（中国大陆用户可以使用 cnpm 加速安装）

`npm i yhwok --save-dev`

使用yarn方式:

`yarn add yhwok --dev`

### 使用

``` bash
// 在自己的项目根目录下的 package.json 添加脚本来运行。

"scripts": {
  "help": "yhwok [help|-h]", // 一些帮助信息
  "version": "yhwok [version|-v]", // 查看版本，提示版本更新
  "init": "yhwok init [project name]", // 初始化一个项目的文件（hybrid/vue/weex/react/...）
  "build": "yhwok build",  // 构建打包，
  "server": "yhwok server", // TODO: mock data is miss
}
```

### 测试

``` bash
webpack --config  ./config/webpack.config.dev.js
```
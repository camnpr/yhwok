<p align="center">
  <a href="http://www.github.com">
    <img width="200" src="https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg" title="Flag Image"/>
  </a>
</p>

![image | left](https://img.shields.io/badge/PRs-welcome-brightgreen.svg "")
![image | left](https://img.shields.io/github/license/mashape/apistatus.svg "")
[![NPM version](https://img.shields.io/npm/v/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![NPM downloads](http://img.shields.io/npm/dm/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### yhwok

yhwok is a simple develop cli. [简体中文](readme-CN.md)

### Features

* **Develop Environment**: yes e.g. hot,express...
* **Template**: yes  e.g. simple,weex,vue,react,wechat...
* **PWA**: yes
* **Mock Data**: yes
* **HMR**: no
* **Plugin**: no
* **...**: no

### Install

install with npm:

`npm i yhwok --save-dev`

install with yarn:

`yarn add yhwok --dev`

### Usage

``` bash
// package.json

"scripts": {
  "help": "yhwok [help|-h]", // to be perfected...
  "version": "yhwok [version|-v]", // add version update check
  "init": "yhwok init [project name]", // create project files; TODO: support simple, motion, weex, Wechat, vue, react...
  "build": "yhwok build", // support pwa
  "dev": "yhwok dev" // TODO: vconsole ? unit test
}
```

### mock data

```
{ '/hello': [Function: /hello],
  '/list': [Function: /list],
  '/user': { name: 'test', age: 20 },
  '/api/*': 'http://www.example.com',
  '/ok': [Function: /ok],
  '/new': [Function: /new],
  '/old1': { name: 'test', age: 101 } }
[HPM] Proxy created: /  ->  http://www.example.com
```

### Test

``` bash
webpack --config  ./config/webpack.config.dev.js
```
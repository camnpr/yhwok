![image | left](https://img.shields.io/badge/PRs-welcome-brightgreen.svg "")
![image | left](https://img.shields.io/github/license/mashape/apistatus.svg "")
[![NPM version](https://img.shields.io/npm/v/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![NPM downloads](http://img.shields.io/npm/dm/yhwok.svg?style=flat)](https://npmjs.org/package/yhwok)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### yhwok

yhwok is a simple develop cli. 

### Install

install with npm:

`npm i yhwok --save-dev`

install with yarn:

`yarn add yhwok --dev`

### Usage

```
package.json

"scripts": {
  "help": "yhwok [help|-h|-help]", // to be perfected...
  "version": "yhwok [version|-v|-version]", // add version update check
  "init": "yhwok init", // create project files
  "build": "yhwok build", 
  "server": "yhwok server", // TODO: mock data is miss
  "weex": "yhwok weex [args]" // args: weex official any params
}
```

### Test

`webpack --config  ./config/webpack.config.dev.js`
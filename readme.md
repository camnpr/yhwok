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
  "version": "yhwok version",
  "build": "yhwok build",
  "server": "yhwok server"
}
```

### Test

`webpack --config  ./config/webpack.config.dev.js`
'use strict'

const http = require('http');
const chalk = require('chalk');
const argv = require('yargs').argv;
const path = require('path');
const fs = require('fs');
const proxy = require('http-proxy-middleware');
const chokidar = require('chokidar');

// 要监控的文件或者文件夹。
const cwd = fs.realpathSync(process.cwd());
const configFile = path.resolve(cwd, '.yhwokrc.mock.js'); // 返回所有的mock文件
const mockDir = path.resolve(cwd, './mock/');
const entryAppFile = path.resolve(cwd, './app.js');

// 获取配置信息
function getConfig() {
    if (fs.existsSync(configFile)) {
        // 禁止require 缓存 （解决： 更改mock文件夹里的api路径，前端找不到对应的路径api的问题）
        Object.keys(require.cache).forEach(file => {
            if (file === configFile || file.indexOf(mockDir) > -1 || file === entryAppFile) {
                console.log(chalk.yellow('delete require cache ' + file));
                delete require.cache[file];
            }
        });

        return require(configFile);
    } else {
        console.log(chalk.red('not find file: .yhwokrc.mock.js'))
        return {};
    }
}

function createMockHandler(method, path, value) {
    return function mockHandler(...args) {
        const res = args[1];
        if (typeof value === 'function') {
            value(...args);
        } else {
            res.json(value);
        }
    }
}

function applyMock(app) {
    const apis = getConfig();
    // console.log(apis);

    for (let item in apis) {
        if (typeof apis[item] === 'string') {
            // 代理跨域（本地ip => 接口地址）
            app.use(item, proxy({
                target: apis[item],
                changeOrigin: true
            }));
        } else {
            app['get'](item, createMockHandler('get', item, apis[item]));
        }
        // console.log(item, apis[item]);
    }

    const watcher = chokidar.watch([configFile, mockDir, entryAppFile], {
        ignored: /node_modules/,
        persistent: true
    });

    watcher.on('change', path => {
        console.log(chalk.green('CHANGE'), path.replace(cwd, '.'));
        watcher.close();

        // 删除旧的 mock api （解决：更改mock文件夹里的返回数据，前端请求到的数据没有同步更新的问题）
        /*
             Layer {
                handle: [Function: bound dispatch],
                name: 'bound dispatch',
                params: undefined,
                path: undefined,
                keys: [],
                regexp: { /^\/hello\/?$/i fast_star: false, fast_slash: false },
                route: Route { path: '/hello', stack: [Array], methods: [Object] } },
        */
        // 找到第一个name是 bound dispatch
        let firstIndex = null;
        app._router.stack.forEach((item, index) => {
            if (!firstIndex && item.name === 'bound dispatch') {
                firstIndex = index;
            }
        });
        let mockApiLength = app._router.stack.length - firstIndex;
        app._router.stack.splice(firstIndex, mockApiLength);

        // 重新应用mock router
        applyMock(app);
    });
}

module.exports = applyMock;
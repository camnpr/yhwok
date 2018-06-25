export default function registerBabel(opts = {}) {
  const { only, ignore, babelPreset, disablePreventTest } = opts;
  if (disablePreventTest || process.env.NODE_ENV !== 'test') {
    process.env.BABEL_DISABLE_CACHE = 1;
    require('@babel/register')({
      // eslint-disable-line
      presets: [babelPreset],
      plugins: [
        require.resolve('babel-plugin-add-module-exports'),
        require.resolve('@babel/plugin-transform-modules-commonjs'),
      ],
      only,
      ignore,
      babelrc: false,
      cache: false,
    });
  }
}

//------------------------------------------------------------

import { join } from 'path';
import registerBabel from 'af-webpack/registerBabel';
import excapeRegExp from 'lodash.escaperegexp'; // 编码转化，如 c://folder => c:\/\/folder

export default function(babelPreset, opts) {
  const { configOnly, disablePreventTest, ignore, cwd } = opts;
  const files = [
    '.roadhogrc.mock.js',
    '.webpackrc.js',
    'webpack.config.js',
    'mock',
    'src',
  ].map(file => {
    return excapeRegExp(join(cwd, file));
  });
  const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;

  registerBabel({
    only,
    ignore,
    babelPreset,
    disablePreventTest,
  });
}

// -----------------------------------------------------------------

import registerBabel from './registerBabel';
const cwd = process.cwd();

// register babel for config files
registerBabel(babel, {
  cwd,
  configOnly: true,
});
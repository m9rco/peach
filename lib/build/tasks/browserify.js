/**
 * @fileoverview CommonJS规范融入
 * @author  pushaowei
 */

'use strict';

module.exports = function ($, appConf, moduleConf, args) {
  return function (mod, modulePath, appPath) {
    return new Promise(function (resolve, reject) {
      var path = require('path');
      var vfs = require('vinyl-fs');
      var through2 = require('through2');

      var Util = require('../../util');
      var peachMate = require('../athena_mate')
      var useBabel = moduleConf.support.useBabel || {
        enable: false
      }
      var enableBabel = useBabel.enable;
      var jsxPragma = useBabel.jsxPragma || 'Nerv.createElement'
      var useBrowserify = moduleConf.support.useBrowserify || {
        enable: false
      }

      $.util.log($.util.colors.green('开始' + mod + '模块任务 browserify！'));
      vfs.src([path.join(modulePath, 'dist', '_static', 'js', '**', '*.js'), path.join('!' + modulePath, 'dist', '_static', 'js', '**', '*.min.js')])
      .pipe($.if(useBrowserify, peachMate.browserify({
          config: {
          },
          contentTest: useBrowserify.ContentTest || /require/,
          fileTest: useBrowserify.test || /\.js/,
          exclude: useBrowserify.exclude || []
        })))
      .pipe(vfs.dest(path.join(modulePath, 'dist', '_static', 'js')))
      .on('end', function () {
          $.util.log($.util.colors.green('结束' + mod + '模块任务browserify！！'));
          resolve();
        })
        .on('error', function (err) {
          $.util.log($.util.colors.red(mod + '模块任务browserify！失败！'));
          reject(err);
        });
    });
  };
};

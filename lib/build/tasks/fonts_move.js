/**
 * @fileoverview 字体移动
 * @author  pushaowei
 */

'use strict';

module.exports = function ($, appConf, moduleConf, args) {
  return function (mod, modulePath, appPath) {
    return new Promise(function (resolve, reject) {
      var vfs = require('vinyl-fs');
      vfs.src(modulePath + '/dist/static/css/' + '*.ttf')
        .on('finish', function () {
          $.util.log($.util.colors.green('开始' + mod + '模块任务的font'));
        })
        .pipe(vfs.dest(modulePath + '/dist/_static/css/'))
        .on('finish', function () {
          $.util.log($.util.colors.green('完成' + mod + '模块任务的font'));
          resolve();
        })
        .on('error', function (err) {
          $.util.log($.util.colors.red(mod + '模块的font文件失败！'));
          reject(err);
        })
        .pipe($.util.noop());
    });
  };
};

/**
* @fileoverview 上传统计代码包
* @author  liweitao
*/

'use strict';

module.exports = function ($, appConf, moduleConf, args) {
  return function (mod, modulePath, appPath, remoteName) {
    return new Promise(function (resolve, reject) {
      var path = require('path');
      var fs = require('fs');
      var archiver = require('archiver');
      var archive = archiver('zip', {});
      var request = require('request');

      var modZipName = mod + '.zip';
      var output = fs.createWriteStream(path.join(modulePath, modZipName));
      var Util = require('../../util');
      output.on('close', function () {
        $.util.log('需要统计的代码包压缩完毕，大小：' + new Number(archive.pointer() / (1024 * 1024)).toFixed(2) + 'M，准备上传..' );
        var appDeploy = appConf.deploy;
        var previewObj = appDeploy.preview ? appDeploy.preview : appDeploy.jdcfinder;
        var previewUrl = '';
        if (previewObj) {
          previewUrl = 'http://' + previewObj.host + previewObj.fdPath + appConf.app;
        }
        // var params = {
        //   appId: appConf.appId,
        //   moduleId: moduleConf.moduleId,
        //   peach: fs.createReadStream(path.join(modulePath, modZipName)),
        //   preview: previewUrl
        // };
        // 上报压缩包数据
        $.util.log('正在上传...');
          fs.unlinkSync(path.join(modulePath, modZipName));
          resolve(remoteName);
      });

      archive.on('error', function(err){
        reject(err);
        throw err;
      });

      archive.pipe(output);
      archive.append(fs.createReadStream(path.join(modulePath, 'dist', 'map.json')), { name: 'map.json' });
      archive.append(fs.createReadStream(path.join(modulePath, 'dist', 'data.json')), { name: 'data.json' });
      archive.append(fs.createReadStream(path.join(modulePath, 'dist', 'statistics.json')), { name: 'statistics.json' });
      archive.append(fs.createReadStream(path.join(modulePath, 'dist', 'module-conf.js')), { name: 'module-conf.js' });
      archive.finalize();
    });
  };
};

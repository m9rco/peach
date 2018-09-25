/**
 * @fileoverview CommonJS规范融入
 * @author  pushaowei
 */

var path = require('path');
var gutil = require('gulp-util');
var through2 = require('through2');
var applySourceMap = require('vinyl-sourcemaps-apply');
var babel = require('babel-core');
var _ = require('lodash');
var browserify = require('browserify');



module.exports = function (opts) {
  opts = _.assign({}, opts);
  return through2.obj(function (file, enc, cb) {
    if (file.isNull() || file.isStream()) {
      cb(null, file);
      return;
    }
    var filename = file.path;

    if (!opts.fileTest.test(filename)) {
      this.push(file);
      return cb();
    }

    if (!opts.contentTest.test(file.contents.toString())) {
      this.push(file)
      return cb();
    }

    var isExcluded = false
    var exclude = opts.exclude || []
    exclude.forEach(function (item) {
      if (filename.indexOf(path.join(item)) >= 0) {
        isExcluded = true
      }
    })
    if (isExcluded) {
      this.push(file)
      return cb()
    }

    try {
      var fileOpts = _.assign({}, opts.config, {
        debug: false,
        // transform: [reactify]
      });


      // if (file.sourceMap && res.map) {
      //   applySourceMap(file, res.map);
      // }
      // if (!res.ignored) {

        var fs = require('fs')
        var fileStrem = undefined;
        var res = browserify(fileOpts)
                  .add(filename)
                  .bundle((err,res)=>{
                      file.contents = res
                      this.push(file);
                      cb(null, file);
                      // console.log(fileStrem,'我编译完了！！！')
                  });
                  // .pipe(process.stdout); // 直接输出
                //   .on('finish',  e  => {
                //     // file.contents = res.Buffer();
                //     // this.push(file);
                //     // file.contents = res;
                //     // this.push(file);
                //     // cb(null, res);
                //     // first = true
                //     // console.log(currentStrem.contents.toString(), e);
                //     // file.contents = new Buffer(test.contents.toString())
                //     // this.push(file);
                // })

            // if (fileStrem === undefined) {
            //     file.contents = new Buffer(file.contents.toString());
            // }else{
            //     console.log('完成！！！！');
            //     file.contents = fileStrem;
            // }
      // }
    } catch (err) {
      this.emit('error', new gutil.PluginError('athena-browserify', err, {
        fileName: file.path,
        showProperties: false
      }));
    }
    // cb();
  });
};

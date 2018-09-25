/**
 * @fileoverview CommonJS规范融入
 * @author  pushaowei
 */

var path = require('path');
var gutil = require('gulp-util');
var through2 = require('through2');
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
      });
    browserify(fileOpts)
            .add(filename)
            .bundle((err,res) =>{
                file.contents = res
                this.push(file);
                cb(null, file);
            });
    } catch (err) {
      this.emit('error', new gutil.PluginError('athena-browserify', err, {
        fileName: file.path,
        showProperties: false
      }));
    }
  });
};

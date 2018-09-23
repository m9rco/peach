/**
* @fileoverview 入口文件，对外暴露方法
* @author  liweitao
*/

'use strict';

var scan = require('./peach_scan');
var scanServer = require('./peach_scan_server');
var concat = require('./peach_concat');
var concatServer = require('./peach_concat_server');
var concatCore = require('./peach_concat_core');
var combo = require('./peach_combo');
var replace = require('./peach_replace');
var replaceServer = require('./peach_replace_server');
var rev = require('./peach_rev');
var revServer = require('./peach_rev_server');
var revNoHash = require('./peach_rev_no_hash');
var revNoHashServer = require('./peach_rev_no_hash_server');
var imagemin = require('./peach_imagemin');
var cssnano = require('./peach_cssnano');
var uglify = require('./peach_uglify');
var ssh = require('./peach_ssh');
var injectServer = require('./peach_inject_server');
var compass = require('./peach_compass');
var ftp = require('./peach_ftp');
var jdcFinder = require('./peach_jdcfinder');
var publishFilter = require('./peach_publish_filter');
var publishFilterServer = require('./peach_publish_filter_server');
var plumber = require('./peach_plumber');
var buildFilter = require('./peach_build_filter');
var sassFilter = require('./peach_sass_filter');
var sassGraph = require('./peach_sass_graph');
var babel = require('./peach_babel');
var processorJS = require('./peach_processor_js');

module.exports = {
  scan: scan,
  scanServer: scanServer,
  concat: concat,
  concatServer: concatServer,
  concatCore: concatCore,
  combo: combo,
  replace: replace,
  replaceServer: replaceServer,
  rev: rev,
  revServer: revServer,
  revNoHash: revNoHash,
  revNoHashServer: revNoHashServer,
  imagemin: imagemin,
  cssnano: cssnano,
  uglify: uglify,
  ssh: ssh,
  injectServer: injectServer,
  compass : compass,
  ftp: ftp,
  jdcFinder: jdcFinder,
  publishFilter: publishFilter,
  publishFilterServer: publishFilterServer,
  plumber: plumber,
  buildFilter: buildFilter,
  sassFilter: sassFilter,
  sassGraph: sassGraph,
  babel: babel,
  processorJS: processorJS
};

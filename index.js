'use strict';

var through = require('through2'),
    File = require('vinyl'),
    dox = require('dox'),
    doxxCompile = require('doxx/lib/compile'),
    doxxParse = require('doxx/lib/parser'),
    doxxSymbols = require('doxx/lib/symbols'),
    debug = require('debug')('gulp-doxx'),
    _ = require('lodash'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME;


PLUGIN_NAME = 'gulp-doxx';

module.exports = function gulpDoxx(opts) {
  var opts = opts || {},
      allFiles = [],
      allSymbols = [];

  opts.targetExtension = opts.targetExtension || 'html';

  return through.obj(function transform(file, enc, cb) {
    var targetName = file.path + '.' + opts.targetExtension,
        symbols,
        dox;

    if (file.isNull()) {
      debug('file is null');
      cb();
      return;
    }

    debug('got file', file.name);

    dox = doxxParse(file.path);
    symbols = doxxSymbols(dox, targetName);

    allFiles.push({
      dox: dox,
      name: file.path,
      targetName: targetName,
      symbols: symbols
    });

    allSymbols = allSymbols.concat(symbols || []);

    cb();
  }, function flush(cb) {
    var stream = this;

    allFiles.forEach(function(doxxFile) {
      var compiledContent, compileOpts;

      compileOpts = _.extend(doxxFile, {
        title: opts.title || 'Title not set',
        allSymbols: allSymbols,
        files: allFiles,
        currentName: doxxFile.name
      });

      compiledContent = doxxCompile(compileOpts);

      stream.push(new File({
        path: doxxFile.targetName,
        contents: new Buffer(compiledContent)
      }));
    });

    cb();
  })
};


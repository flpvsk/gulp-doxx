'use strict';

var through = require('through2'),
    File = require('vinyl'),
    dox = require('dox'),
    doxxCompile = require('doxx/lib/compile'),
    doxxParse = require('doxx/lib/parser'),
    doxxSymbols = require('doxx/lib/symbols'),
    marked = require('marked'),
    debug = require('debug')('gulp-doxx'),
    _ = require('lodash'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    PLUGIN_NAME;


PLUGIN_NAME = 'gulp-doxx';

/**
 * gulp-doxx plugin
 *
 * *Example*
 *
 *      var gulp = require('gulp'),
 *          gulpDoxx = require('gulp-doxx');
 *
 *      gulp.task('docs', function() {
 *
 *        gulp.src('*.js')
 *          .pipe(gulpDoxx({
 *            title: 'My App Title'
 *          }))
 *          .pipe(gulp.dest('docs'));
 *
 *      });
 *
 * @param {Object} opts - options
 * @param {String} [opts.title=No title] - application title
 * @param {String} [opts.targetExtension=html] - result files extension
 *
 * @api public
 */
module.exports = function gulpDoxx(opts) {
  var opts = opts || {},
      allFiles = [],
      allSymbols = [];

  opts.targetExtension = opts.targetExtension || 'html';

  return through.obj(function transform(file, enc, cb) {
    var targetName = file.path + '.' + opts.targetExtension,
        isReadme = /readme\.?[^\.]*$/i,
        symbols,
        dox;

    if (file.isNull()) {
      debug('file is null');
      cb();
      return;
    }

    debug('got file', file.path);

    if (isReadme.test(file.relative)) {
      debug('got readme', file.relative);

      allFiles.unshift({
        name:"Main",
        targetName: "index.html",
        relName: "index.html",
        readme: marked(file.contents.toString()),
        dox:[],
        symbols:[]
      });
    }

    dox = doxxParse(file.path);
    symbols = doxxSymbols(dox, targetName);

    allFiles.push({
      dox: dox,
      name: file.path,
      targetName: targetName,
      relName: file.relative + '.' + opts.targetExtension,
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


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
    fs = require('fs'),
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

  if (opts.template) {
    doxxCompile.tpl = fs.readFileSync(opts.template).toString();
    doxxCompile.tplFileName = opts.template;
  }

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

      if (opts.urlPrefix){
        var indexUrl = opts.urlPrefix + '/index.html';
      }else{
        var indexUrl = 'index.html';
      }
      allFiles.unshift({
        name:'Main',
        targetName: 'index.html',
        relName: indexUrl,
        readme: marked(file.contents.toString()),
        dox:[],
        symbols:[]
      });
    }
    if (opts.urlPrefix){
      var fileUrl = opts.urlPrefix + targetName.replace(file.cwd, '');
    }else{
      var fileUrl = file.relative + '.' + opts.targetExtension;
    }
    dox = doxxParse(file.path);
    symbols = doxxSymbols(dox, targetName);

    allFiles.push({
      dox: dox,
      name: file.relative,
      targetName: targetName,
      relName: fileUrl,
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


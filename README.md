# gulp-doxx

[Doxx][doxx] documentation generator for [gulp][gulp].

## Install

    npm install gulp-doxx

## Configure

      var gulp = require('gulp'),
          gulpDoxx = require('gulp-doxx');

      gulp.task('docs', function() {

        gulp.src(['**/*.js', 'README.md'])
          .pipe(gulpDoxx({
            title: 'My App Title'
          }))
          .pipe(gulp.dest('docs'));

      });


## Options

### template

Type: `String`

Default: `undefined`

Path to jade template to be used to generate result.

If not set, default [doxx template][doxx-example] will be used.

## Run

    gulp docs

[doxx]: https://github.com/FGRibreau/doxx
[gulp]: http://gulpjs.com/
[doxx-example]: http://fgribreau.github.io/doxx/docs/compile.js.html

# gulp-doxx

[Doxx][doxx] documentation generator for [gulp][gulp].

## Install

    npm install gulp-doxx

## Configure

      var gulp = require('gulp'),
          gulpDoxx = require('gulp-doxx');

      gulp.task('docs', function() {

        gulp.src('app/scripts/**/*.js')
          .pipe(gulpDoxx({
            title: 'My App Title'
          }))
          .pipe(gulp.dest('docs'));

      });


## Run

    gulp docs

[doxx]: https://github.com/FGRibreau/doxx
[gulp]: http://gulpjs.com/

var gulp = require('gulp'),
    gulpDoxx = require('./');


gulp.task('example:simple', function() {
  return gulp.src('examples/simple/**/*.js')
    .pipe(gulpDoxx({
      title: 'Simple Example'
    }))
    .pipe(gulp.dest('docs'));
});


gulp.task('example:with-template', function() {
  return gulp.src('examples/with-template/**/*.js')
    .pipe(gulpDoxx({
      template: 'examples/with-template/template.jade'
    }))
    .pipe(gulp.dest('docs'));
});


gulp.task('example:with-url-prefix', function() {
  return gulp.src('examples/with-url-prefix/**/*.js')
    .pipe(gulpDoxx({
      urlPrefix: 'docs'
    }))
    .pipe(gulp.dest('docs'));
});


gulp.task('docs', function() {
  return gulp.src(['index.js', 'README.md'])
    .pipe(gulpDoxx({
      title: 'gulp-doxx'
    }))
    .pipe(gulp.dest('docs'));
});

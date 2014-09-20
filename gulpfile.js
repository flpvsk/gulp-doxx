var gulp = require('gulp'),
    gulpDoxx = require('./');


gulp.task('simple-example', function() {
  return gulp.src('examples/simple/**/*.js')
    .pipe(gulpDoxx({
      title: 'Simple Example'
    }))
    .pipe(gulp.dest('examples/simple/docs'));
});

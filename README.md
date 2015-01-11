# gulp-doxx

[Doxx][doxx] documentation generator for [gulp][gulp].

## Install

    npm install gulp-doxx

## Configure

```js
var gulp = require('gulp'),
    gulpDoxx = require('gulp-doxx');

gulp.task('docs', function() {

  gulp.src(['**/*.js', 'README.md'])
    .pipe(gulpDoxx({
      title: 'My App Title',
      urlPrefix: '/docs'
    }))
    .pipe(gulp.dest('docs'));

});
```



## Options

### title
Type: `String`

The title of your project

Default: `Title not set`

### urlPrefix
Type: `String`

Default: `null`

Prefix to be used for generating links in menu.

#### Examples

**Without** `urlPrefix` menu link could look like:

```html
<a href="script.js.html">script.js</a>
```

Same link with `urlPrefix` set to `./docs`:

```html
<a href="./docs/script.js.html">script.js</a>
```

Same link with `urlPrefix` set to `http://my-docs-server.io`:

```html
<a href="http://my-docs-server.io/script.js.html">script.js</a>
```


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

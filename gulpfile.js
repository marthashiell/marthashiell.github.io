var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin')
var minifyInline = require('gulp-minify-inline');
var rename = require('gulp-rename');
var vulcanize = require('gulp-vulcanize');

gulp.task('default', function() {
  gulp.src('index_dev.html')
      .pipe(vulcanize({
          inlineCss: true,
          inlineScripts: true,
          stripComments: true
      }))
      .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          sortAttributes: true,
          sortClasses: true
      }))
      .pipe(minifyInline())
      .pipe(rename('index.html'))
      .pipe(gulp.dest('.'));
});

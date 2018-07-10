const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const watchify = require('watchify');
const sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch:sass', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

function compile(watch) {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries: ['./src/js/index.js'],
    debug: true,
    plugin: [watchify]
  }).transform(babelify);

  function bundle() {
    bundler.bundle()
      .on('error', function(err) { 
        console.error(err); this.emit('end');
      })
      .pipe(source('./src/js/index.js'))
      .pipe(buffer())
      .pipe(rename('index.js'))
      .pipe(gulp.dest('./dist'))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  bundler.on('update', (filename) => {
    delete bundler._options.cache[filename];
    bundle();
  });
  return bundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() {
  return compile();
});
gulp.task('watch:js', function() {
  return gulp.watch('./src/js/*.js', () => {
    watch();
  });
});

gulp.task('default', ['build', 'sass', 'watch:js', 'watch:sass']);
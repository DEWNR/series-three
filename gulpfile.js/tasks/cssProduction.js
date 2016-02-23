var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp')
var replace      = require('gulp-replace')
var sass         = require('gulp-sass')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var cssnano      = require('gulp-cssnano')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssProductionTask = function () {
  return gulp.src(paths.src)
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(replace('../images/', ''))
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('css:production', cssProductionTask)
module.exports = cssProductionTask

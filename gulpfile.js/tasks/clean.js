var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var handleErrors = require('../lib/handleErrors')

var cleanTask = function (cb) {
  del([config.root.dest]).then(function (paths) {
    cb()
  })
  // .on('error', handleErrors)
}

gulp.task('clean', cleanTask)
module.exports = cleanTask

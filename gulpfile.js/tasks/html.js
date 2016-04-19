var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var fs           = require('fs')
var jsoncombine  = require("gulp-jsoncombine")
var gulpSequence = require('gulp-sequence')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}


var jsonTask = function(cb) {

 var dataFiles = path.resolve(config.root.src, config.tasks.html.src, 'data/*.json')

   gulp.src(dataFiles)
    .pipe(jsoncombine("global.json",function(data){
       var sData = JSON.stringify(data)
       var sDataCC = sData.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })

       return new Buffer(sDataCC)
    }))
    .pipe(gulp.dest("./src/html/data"));

}


var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)

  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}






var htmlTask = function(cb) {
    render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false })


    return gulp.src(paths.src)
      .pipe(data(getData))
      .on('error', handleErrors)
      .pipe(render())
      .on('error', handleErrors)
      .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream())
}

gulp.task('json', jsonTask)
gulp.task('html', gulpSequence(['json'], htmlTask))

module.exports = htmlTask

var config       = require('../config')
var gulp         = require('gulp')
var jsoncombine  = require("gulp-jsoncombine")
var path         = require('path')

var jsonTask = function(cb) {
 
 var dataFiles = path.resolve(config.root.src, config.tasks.html.src, 'data/*.json')

 return gulp.src(dataFiles)
   .pipe(jsoncombine("global.json",function(data){
       return new Buffer(JSON.stringify(data))
   }))
   .pipe(gulp.dest("./src/html/data"));

}

gulp.task('json', jsonTask)
module.exports = jsonTask

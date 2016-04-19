var config       = require('../config')
var gulp         = require('gulp')
var jsoncombine  = require("gulp-jsoncombine")
var path         = require('path')

var jsonTask = function(cb) {

 var dataFiles = path.resolve(config.root.src, config.tasks.html.src, 'data/*.json')
 console.log('task ran');

 return gulp.src(dataFiles)
   .pipe(jsoncombine("global.json",function(data){
       var sData = JSON.stringify(data)
       var sDataCC = sData.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })

       return new Buffer(sDataCC)
   }))
   .pipe(gulp.dest("./src/html/data"));

}

gulp.task('json', jsonTask)
module.exports = jsonTask

'use strict';

var argv = require('yargs').argv,   // Pass agruments using the command line
    concat = require('gulp-concat'),    // Combine JavaScript simple JavasScript files
    del = require('del'),   // Delete unwanted files and folders (eg dist before production build)
    gulp = require('gulp'),
    jsList,   // List of JavaScripts to combine
    mustache = require('gulp-mustache-plus'),
    mustacheData,
    mustachePartials,
    passthrough = require('gulp-empty'),    // Pass through an unaltered stream; useful for conditional processing
    paths,  // Frequently used file paths
    rev = require('gulp-rev'),      // Add a hash-based fingerprint to the output filename
    uglify = require('gulp-uglify');    // Mangle and compress JavaScript


// Set the commonly used folder paths

(function () {

    // Set the variables for the root folders

    var dest = argv.production ? "./dist/" : "./temp/",    // Use the dist folder for a "production" build or the temp folder for all other builds
        src = "./";


    // Set paths as an object

    paths = {};


    // Create the dest object

    paths.dest = {};
    
    paths.dest.root = dest;
    
    paths.dest.js = dest + "js/";


    // Create the source object

    paths.src = {};

    paths.src.js = src + "js/";
    
}());


// Define JavaScript bundles

/**
 * Note: this method is deprecated. User Browserify for all new script bundles.
 **/

jsList = [
    {
        source: [
            paths.src.js + "s3-prepare.js",
        ],
        filename: "s3-prepare.js"
    },
    {
        source: [
            paths.src.js + "modernizr.custom.45448.js",
            paths.src.js + "s3-enhance.js"
        ],
        filename: "s3-enhance.js"
    },
    {
        source: [
            paths.src.js + "s3-slider.js"
        ],
        filename: "s3-slider.js"
    }
];





// Define Mustache data and partials

mustacheData = {
  "navigation-tiles": [
    { 
      "navigation-tile-url": "#",
      "navigation-tile-title": "Navigation Title 1",
      "navigation-tile-teaser": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },{ 
      "navigation-tile-url": "#",
      "navigation-tile-title": "Navigation Title 2",
      "navigation-tile-teaser": "Nam id nibh ac lacus molestie consequat. Nunc vel arcu at nisl volutpat mollis a id sem."
    },{ 
      "navigation-tile-url": "#",
      "navigation-tile-title": "Navigation Title 3",
      "navigation-tile-teaser": "Donec ante justo, scelerisque eget mauris id"
    }
  ]
};

mustachePartials = {
  "navigation-tiles": "./templates/partials/navigation-tile.mustache"
};





// Redefine optimisation processes so they're not used for development builds

if (!argv.production) {
    del = passthrough;
    del.sync = passthrough;
    rev = passthrough;
    rev.manifest = passthrough;
    uglify = passthrough;
}





// Remove destination folder in production mode

gulp.task('clean', function () {
    del.sync([paths.dest.root]);
});





// Mustache template files

gulp.task('mustache', function () {
  gulp.src("./templates/*.mustache")
      .pipe(mustache(
        mustacheData, 
        {}, 
        mustachePartials
      )).pipe(gulp.dest(paths.dest.root));
});





// Concatenate JavaScript

gulp.task('js-concat', ['clean'], function () {

    // Loop through each bundle.

    jsList.forEach(function (bundle) {

        return gulp.src(bundle.source)
            .pipe(concat(bundle.filename))
            .pipe(uglify())
            .pipe(rev())    // Uglify and fingerprint if in production mode
            .pipe(gulp.dest(paths.dest.js));
    });
});

gulp.task('js-concat:watch', function () {
    gulp.watch(paths.src.js + '**/*.js', ['js-concat']);
});





// Concat then watch

gulp.task('default', ['js-concat','js-concat:watch']);

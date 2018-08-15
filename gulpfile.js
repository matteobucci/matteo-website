var gulp = require('gulp');
var browserSync = require('browser-sync').create();     //Allow realtime viewing the changes
var cleanCSS = require('gulp-clean-css');               //Minify css
var rename = require("gulp-rename");                    //Rename files
var uglify = require('gulp-uglify');                    //Uglify javascript
var imagemin = require('gulp-imagemin');                //Minimize pictures
var stripDebug = require('gulp-strip-debug');           //Remove console.log from final version of js files
var concat = require('gulp-concat');                    //Concat multiple files into one
var size = require('gulp-size');                        //Print the size of the file
var nunjucksRender = require('gulp-nunjucks-render');   //Templating for webpages
var htmlmin = require('gulp-htmlmin');                  //Minimizer of html
var htmlbeautify = require('gulp-html-beautify');
var print = require('gulp-print').default;            //Print files
var l10n = require('gulp-l10n');


//Move all pictures from a dev folder to the public forlder after optimizing them
gulp.task('images', function() {
  return gulp.src('dev/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('html/img'));
});

// Minify compiled CSS
gulp.task('minify-css', function() {
  return gulp.src('dev/css/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    //.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('html/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify JS
gulp.task('minify-js', function() {
  return gulp.src('dev/js/**/*.js')
    .pipe(stripDebug())
    //.pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('html/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Copy of various files
gulp.task('assets', function(){
  var files = [
    'dev/favicon.ico',
    'dev/**/*.json',
    'dev/**/*.xml',
    'dev/**/*.php',
    "dev/.htaccess",
    "dev/manifest.json",
    "dev/browserconfig.xml"
  ];
  gulp.src(files, { dot: true })
    .pipe(print())
    .pipe(gulp.dest('html'));
});

// Copy lib libraries from /node_modules into /lib
gulp.task('copy', function() {

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ]).pipe(gulp.dest('dev/lib/jquery-easing'))
    .pipe(gulp.dest('html/lib/jquery-easing'));

  // Devicons
  gulp.src([
    './node_modules/devicons/**/*',
    '!./node_modules/devicons/*.json',
    '!./node_modules/devicons/*.md',
    '!./node_modules/devicons/!PNG',
    '!./node_modules/devicons/!PNG/**/*',
    '!./node_modules/devicons/!SVG',
    '!./node_modules/devicons/!SVG/**/*'
  ]).pipe(gulp.dest('dev/lib/devicons'))
    .pipe(gulp.dest('html/lib/devicons'));

  gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(gulp.dest('html/lib/bootstrap'))
    .pipe(gulp.dest('dev/lib/bootstrap'));

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('html/lib/jquery'))
    .pipe(gulp.dest('dev/lib/jquery'));

  gulp.src(['node_modules/simple-line-icons/*/*'])
    .pipe(gulp.dest('html/lib/simple-line-icons'))
    .pipe(gulp.dest('dev/lib/simple-line-icons'));

  gulp.src([
    'node_modules/font-awesome/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
    .pipe(gulp.dest('html/lib/font-awesome'))
    .pipe(gulp.dest('dev/lib/font-awesome'));
});

// Run everything
gulp.task('default', ['nunjucks', 'images', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev/'
    }
  })
});

//Templating library
gulp.task('nunjucks', function() {

  var options = {indentSize: 2};

  // Gets .html and .nunjucks files in pages
  return gulp.src('dev/pages/**/*.+(html|njk)')
  // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['dev/templates']
    }))                                         //Render the pages
    .pipe(htmlbeautify(options))                   //Indent them
    .pipe(gulp.dest('dev'))                     //Copy them on dev
    .pipe(htmlmin({collapseWhitespace: true}))  //Minimize them
    .pipe(print())
    .pipe(gulp.dest('html'))                    //Copy them on html
});

gulp.task('load-locales', function () {
  return gulp.src('./dev/locales/*.json')
    .pipe(l10n.setLocales({
      native: 'en',
      enforce: 'warn'
    }));
});

gulp.task('localize', ['load-locales'], function () {
  return gulp.src(['dev/**/*.html', '!dev/pages/**/*.html', '!dev/it/**/*.html'])
    .pipe(l10n())
    .pipe(gulp.dest('./dev/'))
});

var opts = {
  natives: 'en',
  elements: ['title', 'p', 'h1', 'a'],
  attributes: ['alt', 'title'],
  directives: 'translate=yes',
  attributeSetter: 'translate-attrs'
};

gulp.task('extract-locales', function () {
  return gulp.src(['dev/**/*.html', '!dev/pages/**/*.html', '!dev/it/**/*.html'])
    .pipe(l10n.extract(opts))
    .pipe(gulp.dest('dev/locales'));
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'nunjucks', 'images', 'minify-css', 'minify-js', 'extract-locales', 'localize'], function() {
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('dev/pages/**/*.html', ['nunjucks', 'extract-locales', 'localize']);
  gulp.watch('dev/templates/**/*.njk', ['nunjucks']);
  gulp.watch('dev/**/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
  gulp.watch('dev/css/**/*.css', browserSync.reload);
  gulp.watch('dev/img/**/*', browserSync.reload);
});
var gulp        = require('gulp');
var postcss      = require('gulp-postcss');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var cssnano = require('cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var srcSass = './scss/*.scss';
var partials = './scss/partials/*.scss'

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
        'css/main.css',
        'js/*.js',
        './*.html'
    ];

    //initialize browsersync
    browserSync.init(files, {
        server: {
          baseDir:'./'
        }
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'));
});

gulp.task('minify', function () {
    return gulp.src('./css/*.css')
        .pipe(postcss([ autoprefixer({browsers: ['last 2 versions', '> 5%']}), cssnano({discardComments: {removeAll: true}}) ]))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./css/'))
        .pipe(reload({stream:true}));
});

const jsFilesArray = [
  './js/jquery-3.3.1.min.js',
  './dist/slick/slick.min.js',
    './js/main.js'
]

gulp.task('javascript', function() {
  return gulp.src(jsFilesArray)
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js/'));
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
  gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/main.js", ['javascript']);
});

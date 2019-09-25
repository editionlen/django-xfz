var gulp = require("gulp");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var bs = require("browser-sync").create();
var sass = require("gulp-sass");

var path={
    'html': './templates/**/',
    'css':'./src/css/',
    'js':'./src/js/',
    'images': './src/images/',
    'css_dist':'./dist/css/',
    'js_dist':'./dist/js/',
    'images_dist': './dist/images/'
};

gulp.task("html", function () {
   gulp.src(path.html + '*.html')
       .pipe(bs.stream())
});

gulp.task("css", function () {
    gulp.src(path.css + '*.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(cssnano())
        .pipe(rename({"suffix":".min"}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
});

gulp.task("js", function () {
    gulp.src(path.js + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
});

gulp.task("images", function () {
    gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream())
});

gulp.task("watch",function () {
    gulp.watch(path.html + '*.html', ['html']);
    gulp.watch(path.css + '*.scss', ['css']);
    gulp.watch(path.js + '*.js', ['js']);
    gulp.watch(path.images + '*.*', ['images']);
});

gulp.task("bs", function () {
    bs.init({
        'server':{
            'baseDir': './'
        }
    });
});

gulp.task("default", ['bs', 'watch']);
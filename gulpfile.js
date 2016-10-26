/*
 * gulp
 * $ npm install gulp
 */
require('es6-promise').polyfill();

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatcss = require('gulp-concat-css'),
    sourcemaps = require('gulp-sourcemaps'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rtlcss = require('gulp-rtlcss'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch');

/**
 * Style Tasks
 */
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
    	.pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./public/css'))
        
        .pipe(rtlcss())
        .pipe(rename({ suffix: '-rtl' }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task("css-concat", ['sass'], function() {
    return gulp.src("./public/css/**/*.css")
        .pipe(concatcss('styles.css'))
        .pipe(gulp.dest("./public"))

        .pipe(rtlcss())
        .pipe(rename({ suffix: '-rtl' }))
        .pipe(gulp.dest('./public'));
});

gulp.task('styles', ['css-concat'], function() {        
    return gulp.src(['public/styles.css', 'public/rtl.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(cleancss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
    gulp.watch('./src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);


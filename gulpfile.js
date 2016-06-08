'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var livereload = require('gulp-livereload');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('moveJSLibs', function () {
    gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/lightbox2/dist/js/lightbox.min.js',
            'bower_components/jquery.maskedinput/dist/jquery.maskedinput.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('moveCSSLibs', function () {
    gulp.src([
            'bower_components/lightbox2/dist/css/lightbox.min.css'
        ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('moveImagesLibs', function () {
    gulp.src([
            'bower_components/lightbox2/dist/images/**/*'
        ])
        .pipe(gulp.dest('build/images'));
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(livereload());
});

gulp.task('moveJS', function () {
    gulp.src('js/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload());
});

gulp.task('moveImg', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('build/img'))
        .pipe(livereload());
});

gulp.task('jade', function() {
    gulp.src('jade/**/*.jade')
        .pipe(jade({
            //pretty: true,
        }))
        .pipe(gulp.dest('build'))
        .pipe(livereload());
});

gulp.task('moveFavicon', function () {
   gulp.src('favicon.png')
       .pipe(gulp.dest('build'));
});

gulp.task('build', ['moveFavicon', 'moveJSLibs', 'moveCSSLibs', 'moveImagesLibs', 'moveJS', 'moveImg','sass', 'jade']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['moveJS']);
    gulp.watch('img/**/*', ['moveImg']);
    gulp.watch('jade/**/*.jade', ['jade']);
});
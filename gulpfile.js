'use strict';

var gulp         = require('gulp'),
    include      = require('gulp-file-include'),
    htmlmin      = require('gulp-minify-html'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    svgmin       = require('gulp-svgmin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache'),
    livereload   = require('gulp-livereload'),
    del          = require('del');

gulp.task('styles', function () {
    return sass('src/assets/sass/main.scss', {
        style: 'expanded',
        precision: 10,
        defaultEncoding: 'UTF-8',
        lineNumbers: true
    })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('dist/assets/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function () {
    return gulp.src('src/assets/js/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('images', function () {
    return gulp.src('src/assets/img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({message: 'Images task complete'}));
});

gulp.task('svg', function () {
    return gulp.src('src/assets/svg/**/*')
        .pipe(cache(svgmin()))
        .pipe(gulp.dest('dist/assets/svg'))
        .pipe(notify({message: 'SVG task complete'}));
});

gulp.task('include', function () {
    return gulp.src('src/**/*.html')
        .pipe(include({
            prefix: '@@',
            basepath: ''
        }))
        .pipe(gulp.dest('dist/html/unminified'))
        .pipe(notify({message: 'Include task complete'}));
});

gulp.task('htmlmin', function () {
    var opts = {
        comments: false,
        spare: true
    };

    return gulp.src('dist/html/unminified/**/*.html')
        .pipe(htmlmin(opts))
        .pipe(gulp.dest('dist/html/minified'))
        .pipe(notify({message: 'HTMLmin task complete'}));
});

gulp.task('clean', function(cb) {
    del(['dist/assets/html', 'dist/assets/styles', 'dist/assets/js', 'dist/assets/img', 'dist/assets/svg'], cb)
});

gulp.task('default', ['clean'], function () {
    gulp.start('include', 'htmlmin', 'styles', 'scripts', 'images', 'svg');
});

gulp.task('watch', function() {
    // Create LiveReload server
    livereload.listen();

    // Watch .html files
    gulp.watch('src/**/*.html', ['include', 'htmlmin']);

    // Watch .scss files
    gulp.watch('src/assets/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/assets/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/assets/img/**/*', ['images']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
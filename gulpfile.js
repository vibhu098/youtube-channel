'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var using = require("gulp-using");
var jade= require("gulp-jade");
var wrap = require('gulp-wrap-amd');
// var transform		= require("./gulp/gulp-require-transform")

gulp.task('sass', function () {
  gulp.src('./assets/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});
gulp.task('jsx', function () {
	return gulp.src('./assets/javascripts/*.jsx').pipe(using({}))
	.pipe(plumber())
	.pipe(babel())
	.pipe(gulp.dest("./public/js/app"))
});
gulp.task('jade-client', function() {
    gulp.src('./public/javascripts/**/**/*.jade').pipe(using({}))
        .pipe(jade({
            client: true
        }))
        .pipe( wrap({deps: ['jade'], params: ['jade']}) )
        .pipe(gulp.dest('./public/javascripts'));
});


gulp.task('watch', function () {
  gulp.watch('./assets/styles/*.scss', ['sass']);
  gulp.watch('./assets/**/*.jsx',['jsx']);
  gulp.watch('./public/javascripts/**/**/*.jade',['jade-client']);
});
gulp.task('server', function () {
	nodemon({
		script: 'bin/www',
		watch: ['server', 'shared', 'views'],
		nodeArgs: ['--debug']
	}).on('restart', function () {
		setTimeout(function () {reload();}, 5000);
	})
});

gulp.task('default',['sass','jade-client','jsx','watch','server']);

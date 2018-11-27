var gulp = require('gulp');
var less = require('gulp-less');
var smartgrid = require('smart-grid');
var browserSync = require('browser-sync').create();

gulp.task('test', function () {
		console.log('RUN TEST TASK');
});








gulp.task('browserSync', function () {
		browserSync.init({
			server: {
					baseDir: './dist'
			}
		});
});
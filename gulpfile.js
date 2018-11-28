var gulp = require('gulp');
var less = require('gulp-less');
var smartgrid = require('smart-grid');
var browserSync = require('browser-sync').create();

const settings = {
	root: './src',
	dist: './dist',
	srcless: './src/less/*.less',
	srccss: './dist/css',
	srchtml: './dist/*.html'
};

gulp.task('preproc', function () {
	return gulp.src(settings.srcless)
		.pipe(less())
		.pipe(gulp.dest(settings.srccss))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('html', function () {
	gulp.src(settings.srchtml)
		.pipe(gulp.dest(settings.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch', ['preproc', 'browserSync'], function () {
	gulp.watch(settings.srcless, ['preproc']);
	gulp.watch(settings.srchtml, ['html']);
});




gulp.task('browserSync', function () {
		browserSync.init({
			server: {
					baseDir: settings.dist
			}
		});
});
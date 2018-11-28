var gulp = require('gulp');
var less = require('gulp-less');
var smartgrid = require('smart-grid');
var browserSync = require('browser-sync').create();

const settings = {
	root: './src',
	dist: './dist',
	srcless: './src/less/style.less',
	srccss: './dist/css',
	srchtml: './dist/*.html',
	srcjs: './src/js'
};

const smartGrigConf = {
		outputStyle: 'less',
		colums: 12,
		offset: '10px',   // межклоночник
		container: {
				maxWidth: '1280px',
				fields: '30px'   // отступ от края экрана
		},
		breakPoints: {}
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

gulp.task('js', function () {
		gulp.src(settings.srcjs + '/*.js')
		.pipe(gulp.dest(settings.dist + '/js'))
		.pipe(browserSync.reload({
				stream: true
		}));
});

gulp.task('watch', ['preproc', 'js', 'browserSync'], function () {
	gulp.watch(settings.srcless, ['preproc']);
	gulp.watch(settings.srcjs + '/*.js', ['js']);
	gulp.watch(settings.srchtml, ['html']);
});

gulp.task('grid', function () {
		smartgrid(settings.root + '/less', smartGrigConf);
});


gulp.task('browserSync', function () {
		browserSync.init({
			server: {
					baseDir: settings.dist
			}
		});
});
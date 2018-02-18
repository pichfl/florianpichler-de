const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { dest, parallel, src, series, task, watch } = require('gulp');

task('clean', () => del(['./tmp']));

task('styles', () => src('styles/main.scss')
	.pipe(sourcemaps.init({
		loadMaps: true,
	}))
	.pipe(sass({
		sourcemap: true,
	})
	.on('error', sass.logError))
	.pipe(postcss([
		autoprefixer({
			browsers: ['last 2 versions'],
		}),
		mqpacker({
			sort: true,
		}),
		cssnano({
			autoprefixer: false,
		}),
	]))
	.pipe(sourcemaps.write('.'))
	.pipe(dest('tmp')));

task('content', () => src('content/**/*.hbs')
	.pipe(rename((p) => {
		p.extname = '.html';
	}))
	.pipe(dest('tmp')));

task('build', parallel('content', 'styles'));

task('reload', (done) => {
	browserSync.reload();

	return done();
});

task('watch', () => {
	browserSync.init({
		ghostMode: false,
		server: {
			baseDir: ['tmp', 'static'],
		},
		notify: false,
		injectChanges: false,
		open: false,
	});

	watch('content/**/*', series('content', 'reload'));
	watch('styles/**/*.scss', series('styles', 'reload'));
});

task('default', series('build', 'watch'));

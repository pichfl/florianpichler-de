const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const rollup = require('rollup');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const { dest, parallel, src, series, task, watch } = require('gulp');

task('clean', () => del(['./dist']));

task('styles', () =>
	src('src/styles/main.scss')
		.pipe(
			sourcemaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			sass({
				sourcemap: true,
			}).on('error', sass.logError)
		)
		.pipe(
			postcss([
				autoprefixer({
					browsers: ['last 1 versions'],
					flexbox: 'no-2009',
				}),
				mqpacker({
					sort: true,
				}),
				cssnano({
					autoprefixer: false,
				}),
			])
		)
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
);

task('scripts', async () => {
	const bundle = await rollup.rollup({
		input: 'src/scripts/main.js',
		plugins: [],
		banner: '/*! florianpichler.de */',
	});

	await bundle.write({
		file: 'dist/main.js',
		format: 'iife',
		sourcemap: true,
	});

	browserSync.reload();
});

task('content', () => src('src/*.{html,php}').pipe(dest('dist')));

task('build', parallel('content', 'scripts', 'styles'));

task('watch', () => {
	browserSync.init({
		ghostMode: false,
		server: 'dist',
		notify: false,
		open: false,
	});

	watch('src/*.{html,php}', series('content')).on('change', browserSync.reload);
	watch('src/styles/**/*.scss', series('styles'));
	watch('src/scripts/**/*.js', series('scripts'));
});

task('default', series('clean', 'build', 'watch'));

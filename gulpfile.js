const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const del = require('del');
const mqpacker = require('css-mqpacker');
const postcss = require('gulp-postcss');
const rollup = require('rollup');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const critical = require('critical').stream;
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const { dest, parallel, src, series, task, watch } = require('gulp');
const argv = require('minimist')(process.argv.slice(3));

const writeSourcemaps = argv.env !== 'production';

task('clean', () => del(['./dist']));

task('styles', () =>
	src('src/styles/main.scss')
		.pipe(
			sourcemaps.init({
				loadMaps: writeSourcemaps,
			})
		)
		.pipe(
			sass({
				sourcemap: writeSourcemaps,
			}).on('error', sass.logError)
		)
		.pipe(
			postcss([
				autoprefixer({
					browsers: ['last 1 year'],
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
		.pipe(gulpif(writeSourcemaps, sourcemaps.write('.')))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
);

task('scripts', async () => {
	const bundle = await rollup.rollup({
		input: 'src/scripts/main.js',
		plugins: [],
	});

	await bundle.write({
		file: 'dist/main.js',
		format: 'iife',
		sourcemap: writeSourcemaps,
		banner: '/*! florianpichler.de */',
	});

	browserSync.reload();
});

task('content', () => src('src/*.{html,php}').pipe(dest('dist')));

task('watch', () => {
	browserSync.init({
		ghostMode: false,
		injectChanges: false,
		notify: false,
		open: false,
		server: 'dist',
	});

	watch('src/*.{html,php}', series('content')).on('change', browserSync.reload);
	watch('src/styles/**/*.scss', series('styles'));
	watch('src/scripts/**/*.js', series('scripts'));
});

task('critical', () =>
	src('dist/*.html')
		.pipe(
			critical({
				base: 'dist/',
				inline: true,
				css: ['dist/main.css'],
			})
		)
		.on('error', err => {
			gutil.log(gutil.colors.red(err.message));
		})
		.pipe(dest('dist'))
);

const buildTasks = ['clean', parallel('content', 'scripts', 'styles')];

if (argv.env === 'production') {
	buildTasks.push('critical');
}

task('build', series(...buildTasks));

task('default', series('clean', parallel('content', 'scripts', 'styles'), 'watch'));

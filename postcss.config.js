module.exports = {
	plugins: {
		'postcss-inline-svg': {},
		'postcss-import': {},
		'postcss-preset-env': {
			browsers: 'last 1 versions',
		},
		cssnano: {},
	},
};

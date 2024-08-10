export default {
	plugins: {
		'postcss-inline-svg': {},
		'postcss-import': {},
		'postcss-preset-env': {
			browsers: 'defaults, not dead',
		},
		cssnano: {},
	},
};

import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
	root: 'src',
	build: {
		outDir: '../dist',
		assetsDir: '.',
		emptyOutDir: true,
	},
	plugins: [
		createHtmlPlugin({
			template: 'index.html',
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: false,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
				minifyCSS: true,
			},
		}),
	],
});

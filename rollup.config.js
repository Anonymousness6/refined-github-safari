import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default [
	'src/content.js',
].map(entry => ({
	entry,
	dest: entry.replace('src', 'refined-github.safariextension'),
	plugins: [
		nodeResolve({
			browser: true
		}),
		commonJS(),
		json({
			preferConst: true
		})
	],
	format: 'iife',
	sourceMap: process.env.SOURCEMAP || false
}));

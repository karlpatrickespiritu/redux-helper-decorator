import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'lib/index.js',
	output: {
		file: 'dist/bundle.js',
		format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
  },
  external: ['redux', 'lodash'],
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		uglify() // minify, but only in production
	]
}
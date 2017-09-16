import uglify from 'rollup-plugin-uglify'

export default {
	input: 'src/Hammer.js',
	output: {
		file: 'dist/react-hammerjs-iife.min.js',
		format: 'iife',
	},
	external: [ 'react', 'hammerjs' ],
	globals: {
		react: 'React',
	},
	plugins: [uglify()],
}

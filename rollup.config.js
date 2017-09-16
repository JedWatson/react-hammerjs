import uglify from 'rollup-plugin-uglify'

export default {
	entry: 'src/Hammer.js',
	dest: 'dist/react-hammerjs-iife.min.js',
	format: 'iife',
	plugins: [uglify()],
}

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const name = 'Hammer';
const input = 'src/Hammer.js';
const output = 'dist/react-hammerjs';
const globals = {
	'prop-types': 'PropTypes',
	'react-dom': 'ReactDOM',
	react: 'React',
};
const external = Object.keys(globals);
const babelOptions = production => {
	let result = {
		babelrc: false,
		presets: [
			[
				'env',
				{
					modules: false,
					targets: {
						browsers: ['last 2 versions', 'ie 10'],
					},
				},
			],
			'react',
		],
		plugins: ['transform-class-properties'],
	};
	if (production) {
		result.plugins.push('transform-react-remove-prop-types');
	}
	return result;
};

export default [
	{
		input: input,
		output: {
			file: output + '.es.js',
			format: 'es',
		},
		external: external,
		plugins: [babel(babelOptions(false))],
	},
	{
		input: input,
		output: {
			name: name,
			file: output + '.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(false)), resolve()],
	},
	{
		input: input,
		output: {
			name: name,
			file: output + '.min.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)],
	},
];

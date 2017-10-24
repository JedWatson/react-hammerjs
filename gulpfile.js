var browserify = require('browserify');
var shim = require('browserify-shim');
var chalk = require('chalk');
var del = require('del');
var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require("gulp-git");
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var source = require('vinyl-source-stream');
var babelify = require('babelify');

/**
 * Config
 */

var SRC_PATH = 'src';
var DIST_PATH = 'dist';

var PACKAGE_FILE = 'Hammer.js';
var PACKAGE_NAME = 'react-hammerjs';
var COMPONENT_NAME = 'Hammer';

var DEPENDENCIES = [
	'hammerjs',
	'prop-types',
	'react',
	'react-dom',
];


/**
 * Build task
 */

gulp.task('prepare:dist', function (done) {
	return del([DIST_PATH]);
});

gulp.task('build:dist', ['prepare:dist'], function () {

	var standalone = browserify('./' + SRC_PATH + '/' + PACKAGE_FILE, {
			standalone: COMPONENT_NAME
		})
		.transform(babelify.configure({
			presets: [
				["env", {
				  targets: {
					browsers: ["last 2 versions", "ie 10"]
				  },
				}]
			  ],
			  'plugins': ['transform-class-properties'],
			ignore: /(bower_components)|(node_modules)/
		}))
		.transform(shim);

	DEPENDENCIES.forEach(function (pkg) {
		standalone.exclude(pkg);
	});

	return standalone.bundle()
		.on('error', function (e) {
			gutil.log('Browserify Error', e);
		})
		.pipe(source(PACKAGE_NAME + '.js'))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(rename(PACKAGE_NAME + '.min.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(DIST_PATH));

});

gulp.task('build', [
	'build:dist'
]);


/**
 * Version bump tasks
 */

function getBumpTask(type) {
	return function () {
		return gulp.src(['./package.json', './bower.json'])
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('./'));
	};
}

gulp.task('bump', getBumpTask('patch'));
gulp.task('bump:minor', getBumpTask('minor'));
gulp.task('bump:major', getBumpTask('major'));


/**
 * Git tag task
 * (version *must* be bumped first)
 */

gulp.task('publish:tag', function (done) {
	var pkg = require('./package.json');
	var v = 'v' + pkg.version;
	var message = 'Release ' + v;

	git.tag(v, message, function (err) {
		if (err) throw err;
		git.push('origin', v, function (err) {
			if (err) throw err;
			done();
		});
	});
});


/**
 * npm publish task
 * * (version *must* be bumped first)
 */

gulp.task('publish:npm', function (done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});


/**
 * Deploy tasks
 */

gulp.task('release', ['publish:tag', 'publish:npm']);

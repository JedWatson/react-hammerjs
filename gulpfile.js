var browserify = require('browserify'),
	shim = require('browserify-shim'),
	chalk = require('chalk'),
	del = require('del'),
	gulp = require('gulp'),
	bump = require('gulp-bump'),
	git = require("gulp-git"),
	rename = require('gulp-rename'),
	streamify = require('gulp-streamify'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	merge = require('merge-stream'),
	source = require('vinyl-source-stream');


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
	'react'
];


/**
 * Build task
 */

gulp.task('prepare:dist', function(done) {
	del([DIST_PATH], done);
});

gulp.task('build:dist', ['prepare:dist'], function() {
	
	var standalone = browserify('./' + SRC_PATH + '/' + PACKAGE_FILE, {
			standalone: COMPONENT_NAME
		})
		.transform(shim);
	
	DEPENDENCIES.forEach(function(pkg) {
		standalone.exclude(pkg);
	});
	
	return standalone.bundle()
		.on('error', function(e) {
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
	return function() {
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

gulp.task('publish:tag', function(done) {
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

gulp.task('publish:npm', function(done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
});


/**
 * Deploy tasks
 */

gulp.task('release', ['publish:tag', 'publish:npm']);

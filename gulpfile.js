// Based on https://gist.github.com/mikaelbr/54b02412fc651d4e5c9a
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var util = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var connect = require('gulp-connect');

var SRC_DIR = './src/js';
var DEST_DIR = './dest/js';

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript() {
	var props = watchify.args;
	props.entries = [SRC_DIR + '/main.jsx'];
	props.debug = true;
  
	var bundler = browserify(props);
  
	bundler.transform(reactify);
	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.pipe(source('main.js'))
			.pipe(gulp.dest(DEST_DIR));
	}
	bundler.on('update', function() {
		rebundle();
		util.log('Rebundle...');
	});
	return rebundle();
}


gulp.task('default', ['browserify', 'connect']);

gulp.task('browserify', function() {
	return buildScript();
});

gulp.task('connect', function() {
	connect.server({
		port: 9000,
		livereload: true
	});
});

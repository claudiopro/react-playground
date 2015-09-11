/**
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2015 Claudio Procida
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

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

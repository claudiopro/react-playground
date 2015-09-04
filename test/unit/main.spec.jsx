var App = require('../../src/js/main.jsx');
var expect = require('chai').expect;

describe('the main module', function() {
	it('ensures an element with id #main exists', function() {
		expect(document.getElementById('main')).to.not.equal(null);
	});
});

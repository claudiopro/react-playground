var App = require('../../../src/js/app/App.jsx');
var expect = require('chai').expect;

describe('the App component', function() {
	it('is not null', function() {
		expect(App).to.not.equal(undefined);
	});
});

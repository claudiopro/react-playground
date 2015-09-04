var foo = require('../../src/js/test');

describe('function foo', function() {
	it('returns 1', function() {
		expect(foo()).to.equal(1);
	});
});

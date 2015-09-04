var React = require('react');
var App = require('./app/App.jsx');

var node = document.getElementById('main');
if (!node) {
	node = document.createElement('div');
	node.id = 'main';
	document.body.appendChild(node);
}
React.render(<App/>, node);

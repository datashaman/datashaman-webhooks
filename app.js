var express = require('express');
var app = express();

var pkg = require('./pkg');
pkg.boot(app, 'somesecret');

app.post('/', pkg.router(function(req, res, event) {
	switch (event) {
	case 'ping':
		res.send('Ping');
	}
}));

app.listen(80);

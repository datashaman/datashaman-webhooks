var express = require('express');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'app' });

var app = express();

var pkg = require('./index.js');
pkg.boot(app, 'somesecret');

app.post('/', pkg.router(function(req, res, event) {
    log.info(req.body);

	switch (event) {
	case 'ping':
		res.send('Ping');
	}
}));

app.listen(80);

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var pkg = require('./pkg');

app.use(bodyParser.raw({ type: 'application/json' }));
app.use(pkg.middleware);

app.post('/', pkg.router(function(req, res, event) {
	switch (event) {
	case 'ping':
		res.send('Ping');
	}
}));

app.listen(80);

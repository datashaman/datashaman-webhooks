var express = require('express');
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'app' });

var app = express();

var webhooks = require('datashaman-webhooks');
webhooks.boot(app, 'somesecret');

app.post('/', webhooks.router(function(req, res, event) {
    log.info(req.body, event);

    switch (event) {
    case 'ping':
        res.send('Ping');
    }
}));

app.listen(8080);

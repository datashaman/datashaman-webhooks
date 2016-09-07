# datashaman-webhooks
Github webhooks done the easy way.

## howto

Install the package into your Express application:

    npm install --save datashaman-webhooks

Then do something like the following (assuming the use of bunyan for logging):

    var express = require('express');
    var bunyan = require('bunyan');
    var log = bunyan.createLogger({ name: 'app' });

    var app = express();

    var webhooks = require('datashaman-webhooks');
    webhooks.boot(app, process.env.SECRET_TOKEN);

    app.post('/', webhooks.router(function(req, res, event) {
        log.info(req.body, event);

        switch (event) {
        case 'ping':
            res.send('Ping');
            break;
        default:
            res.send('Unhandled event: ' + event);
        }
    }));

    app.listen(process.env.PORT || 8080);

`SECRET_TOKEN` should store the secret from the webhook page on GitHub.

You could also simply copy this app into your base folder, and install the two requirements:

    cp node_modules/datashaman-webhooks/app.js .
    npm install --save express bunyan

You can attach the webhooks router to any route you like, as long it's a post method.

The boot method sets up the body parser for checking the authenticity of the request,
and leaves an object in req.body, which is the JSON request from GitHub as an object.

If the validation fails, a plain HTTP 404 error is returned.

# datashaman-webhooks
Github webhooks done the easy way.

## howto

Install the package into your Express application:

    npm install --save datashaman-webhooks

Then do something like the following (or fork this repository and use _app.js_):

    require('dotenv').config()

    const express = require('express')
    const app = express()

    const webhooks = require('datashaman-webhooks')
    webhooks.boot(app, process.env.GITHUB_SECRET)

    app.post('/', webhooks.router((req, res, event) => {
    switch (event) {
    case 'ping':
        res.send('Ping')
        break
    default:
        res.send('Unhandled event: ' + event)
    }
    }))

    app.listen(process.env.PORT || 8080)

`GITHUB_SECRET` should store the secret from the webhook page on GitHub.

You can attach the webhooks router to any route you like, as long it's a post method.

The boot method sets up the body parser for checking the authenticity of the request,
and leaves an object in req.body, which is the JSON request from GitHub as an object.

If the validation fails, a plain HTTP 404 error is returned.

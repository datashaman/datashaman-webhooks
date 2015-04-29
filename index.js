var bodyParser = require('body-parser');
var Crypto = require('ezcrypto').Crypto;

module.exports = {
    boot: function(app, secret) {
        app.use(bodyParser.raw({ type: 'application/json' }));

        app.use(function (req, res, next) {
            var allowed = true;
            var body = req.body.toString('utf8');

            if (req.headers['x-hub-signature'] !== undefined) {
                var signature = 'sha1=' + Crypto.HMAC(Crypto.SHA1, body, secret, { asBytes: false });
                allowed = signature === req.headers['x-hub-signature'];
            }

            if (allowed) {
                req.body = JSON.parse(body);
                next();
            } else {
                res.sendStatus(404);
                res.end();
            }
        });
    },
    router: function(func) {
        return function (req, res) {
            var event = req.headers['x-github-event'];
            return func(req, res, event);
        };
    }
};

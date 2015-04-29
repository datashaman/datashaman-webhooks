var Crypto = require('ezcrypto').Crypto;

module.exports = {
	middleware: function (req, res, next) {
		var body = req.body.toString('utf8');
		var signature = 'sha1' + Crypto.HMAC(Crypto.SHA1, body, process.env.SECRET, { asBytes: false });

		if (signature === req.headers['x-hub-signature']) {
			req.body = JSON.parse(body);
			next();
		} else {
			res.sendStatus(404);
			res.end();
		}
	},
	router: function(func) {
		return function (req, res) {
			var event = req.headers['x-github-event'];
			return func(req, res, event);
		};
	}
};

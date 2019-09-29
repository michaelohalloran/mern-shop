const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	// get the token via front-end request headers
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).json({ msg: "Not authorized" });

	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		// extract user from the token (since we gave the user's id to the token when we created it)
		// whenever token is sent, it will be sent w/ user stored in the request:
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(400).json({ err: e });
	}
}

module.exports = auth;

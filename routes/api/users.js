const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route GET /api/users/auth/user
// @desc Get user based on token
// @access PUBLIC
router.get("/auth/user", auth, (req, res) => {
	console.log("req.user: ", req.user);
	User.findById(req.user.id)
		.select("-password") // this avoids returning user's password
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json({ err: `Error in finding user: ${err}` }));
});

// @route POST /api/users/auth
// @desc Auth user
// @access PUBLIC
router.post("/auth", (req, res) => {
	// const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ msg: "Please enter all fields" });

	User.findOne({ email })
		.then((user) => {
			if (!user) return res.status(404).json({ msg: "User does not exist" });
			// validate password
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
				// if it's a match, send the jwt token
				jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
					if (err) throw err;
					const { id, name, email } = user;
					return res.json({
						token,
						user: {
							id,
							name,
							email
						}
					});
				});
			});
		})
		.catch((err) => res.status(400).json({ err: "Error in authenticating user" }));
});

// @route POST /api/users
// @desc Add new user
// @access PUBLIC
router.post("/", (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	User.findOne({ email }).then((user) => {
		// if a user is found, someone already registered that email
		if (user) {
			return res.status(400).json({ msg: "That email already exists" });
		}

		const newUser = new User({ name, email, password });
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then((user) => {
						const { id, name, email } = user;
						jwt.sign({ id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
							if (err) throw err;
							return res.json({
								token,
								user: {
									id,
									name,
									email
								}
							});
						});
					})
					.catch((err) => res.status(400).json({ err: `Error in creating user` }));
			});
		});
	});
});

module.exports = router;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		required: true,
		type: String
	},
	register_date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;

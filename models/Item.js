const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

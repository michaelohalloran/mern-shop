const router = require("express").Router();
const Item = require("../../models/Item");
const auth = require("../../middleware/auth");

// @route GET /api/items
// @desc Get all items
// @access PUBLIC
router.get("/", (req, res) => {
	Item.find()
		.sort({ date: -1 }) // sort by date descending
		.then((items) => res.status(200).json(items))
		.catch((err) => res.status(400).json({ err }));
});

// @route POST /api/items
// @desc Post new item
// @access PRIVATE
router.post("/", auth, (req, res) => {
	const { name, date = Date.now() } = req.body;
	const newItem = new Item({ name });
	newItem
		.save()
		.then((data) => res.status(201).json(data))
		.catch((err) => res.status(400).json({ err: `Error in creating item: ${err}` }));
});

// @route DELETE /api/items/:id
// @desc Delete an item
// @access PRIVATE
router.delete("/:id", auth, (req, res) => {
	Item.findByIdAndDelete(req.params.id)
		.then((item) => res.status(204).json(`Deleted ${item}`))
		.catch((err) => res.status(404).json(`Delete error: ${err}`));
});

module.exports = router;

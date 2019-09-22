const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { mongoURI: uri } = require("./config/keys");
const itemRouter = require("./routes/api/items");

app.use(express.json());

app.get("/", (req, res) => {
	res.send({ msg: "hi" });
});

mongoose
	.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(`Error in connecting: ${err}`));
// const { connection } = mongoose;
// connection.once("open", () => console.log("Mongoose connection open"));

// ROUTES
app.use("/api/items", itemRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

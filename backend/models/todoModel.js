const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: "user",
	},
})

module.exports = mongoose.model("todo", todoSchema)

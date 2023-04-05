const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "USER",
		unique: true,
	},
	content: {
		type: String,
		default: "USER",
		unique: true,
	},
	posts: [mongoose.Types.ObjectId, (ref = "post")],
	avatar: {
		type: String,
		default:
			"https://crypto.ru/wp-content/plugins/q-auth/assets/img/default-user.png",
	},
})

module.exports = mongoose.model("group", groupSchema)

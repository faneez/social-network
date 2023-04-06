const Users = require("../models/userModel.js")
// $or: [{ name: search }, { surname: search }],
const userCntrl = {
	getOne: async (req, res) => {
		try {
			const id = req.params.id
			const user = await Users.findById(id)
				.select("-password")
				.populate("friends following")

			if (!user) {
				res.status(400).json({ msg: "Пользователь не найден" })
			}
			res.json(user)
		} catch (e) {
			res.status(500).json({ msg: "Что-то не так с запросом" })
		}
	},
	getAll: async (req, res) => {
		try {
			const search = req.query.search
			let query = {}
			let users = ""
			if (!search) {
				users = await Users.find({ _id: { $ne: req.user._id } })
					.select("-password")
					.populate("friends following")
			} else {
				users = await Users.find({
					_id: { $ne: req.user._id },
					$or: [
						{ name: new RegExp(search, "i") },
						{ surname: new RegExp(search, "i") },
					],
				})
			}

			if (!users) {
				res.status(400).json({ msg: "Пользователь не найден" })
			}

			res.json(users)
		} catch (e) {
			res.status(500).json({ msg: "Что-то не так с запросом" })
		}
	},
}
module.exports = userCntrl

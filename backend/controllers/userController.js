const Users = require("../models/userModel.js")
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
}
module.exports = userCntrl

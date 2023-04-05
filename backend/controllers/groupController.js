const Groups = require("../models/groupModel.js")

const groupCntrl = {
	async getOne() {
		try {
		} catch (e) {}
	},
	async getAll(req, res) {
		try {
			const groups = await Groups.find()

			res.json(groups)
		} catch (e) {
			res.status(500).json({ msg: e.message })
		}
	},
}

module.exports = groupCntrl

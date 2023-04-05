const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
	try {
		const rf_token = req.header("Authorization")
		if (!rf_token) {
			return res.status(500).json({ msg: "Пользователь не авторизован" })
		}
		const decoded = jwt.verify(rf_token, process.env.accessToken)
		if (!decoded) {
			return res.status(500).json({ msg: "Пользователь не найден!" })
		}
		const user = await Users.findById(decoded.userId)
			.select("-password")
			.populate("friends following")

		req.user = user
		next()
	} catch (e) {
		res.status(500).json({ msg: e.message })
	}
}
module.exports = auth

import Videos from "../models/videoModel.js"

const videoCntrl = {
	async getAll(req, res) {
		try {
			const category = req.query.category

			let videos
			if (category == "all") {
				videos = await Videos.find()
			} else {
				videos = await Videos.find({ category: category })
			}
			return res.json(videos)
		} catch (e) {
			return res.status(500).json({ msg: "Не удалось выполнить запрос" })
		}
	},
	async getOne(req, res) {
		try {
			const id = req.params.id
			const video = await Videos.findById(id)
			if (!video) {
				return res.status(400).json({ msg: "Видео не найдено!" })
			}
			return res.json(video)
		} catch (e) {
			return res.status(500).json({ msg: e })
		}
	},
}
export default videoCntrl

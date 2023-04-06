const router = require("express").Router()
const videoCntrl = require("../controllers/videoController.js")
const auth = require("../middlewares/auth.js")

router.get("/videos", auth, videoCntrl.getAll)
router.get("/videos/:id", auth, videoCntrl.getOne)

module.exports = router

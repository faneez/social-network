const router = require("express").Router()
const groupCntrl = require("../controllers/groupController")
const auth = require("../middlewares/auth.js")

router.get("/groups", auth, groupCntrl.getAll)
router.get("/groups/:id")

module.exports = router

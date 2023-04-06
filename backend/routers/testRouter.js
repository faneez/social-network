const router = require("express").Router()
const testCntrl = require("../controllers/testController.js")
const auth = require("../middlewares/auth.js")

router.get("/tests", auth, testCntrl.getAll)
router.get("/tests/:id", auth, testCntrl.getOne)

module.exports = router

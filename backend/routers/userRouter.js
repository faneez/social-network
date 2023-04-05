const router = require("express").Router()
const auth = require("../middlewares/auth.js")

const userCntrl = require("../controllers/userController.js")

router.get("/users/:id", auth, userCntrl.getOne)

module.exports = router

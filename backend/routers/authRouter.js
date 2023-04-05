const router = require("express").Router()

const authCntrl = require("../controllers/authController.js")

router.post("/register", authCntrl.register)
router.post("/login", authCntrl.login)
router.post("/logout", authCntrl.logout)

router.post("/refresh_token", authCntrl.generateAccessToken)

module.exports = router

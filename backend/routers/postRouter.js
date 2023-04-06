const router = require("express").Router()
const postCreateValidation = require("../validations.js")
const postCntrl = require("../controllers/postController.js")
const auth = require("../middlewares/auth.js")
const handleValidationErrors = require("../utils/handleValidationErrors.js")

router.get("/posts", auth, postCntrl.getAll)
router.get("/posts/:id", auth, postCntrl.getOne)
router.post(
	"/posts",
	auth,
	postCreateValidation,
	handleValidationErrors,
	postCntrl.create
)
router.delete("/posts/:id", auth, postCntrl.remove)
router.patch(
	"/posts/:id",
	auth,
	postCreateValidation,
	handleValidationErrors,
	postCntrl.update
)
module.exports = router

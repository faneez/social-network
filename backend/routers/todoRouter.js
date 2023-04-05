const router = require("express").Router()
const todoCntrl = require("../controllers/todoController.js")
const auth = require("../middlewares/auth.js")

router.post("/todos", auth, todoCntrl.addOne)
router.get("/todos", auth, todoCntrl.getTodos)
router.delete("/todos/:id", auth, todoCntrl.deleteOne)
router.patch("/todos", auth, todoCntrl.updateOne)
router.patch("/todos/:id", auth, todoCntrl.changeStatus)

module.exports = router

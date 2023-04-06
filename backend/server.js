require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const auth = require("./middlewares/auth.js")
const multer = require("multer")
const cookieparser = require("cookie-parser")
const authRouter = require("./routers/authRouter.js")
const userRouter = require("./routers/userRouter.js")
const groupRouter = require("./routers/groupRouter.js")
const todoRouter = require("./routers/todoRouter.js")
const videoRouter = require("./routers/videoRouter.js")
const testRouter = require("./routers/testRouter.js")
const postRouter = require("./routers/postRouter.js")

const app = express()
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads")
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })
app.use(express.json())
app.use(cors())
app.use(cookieparser())
app.use("/uploads", express.static("uploads"))

//routes
app.post("/api/upload", upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})
app.use("/api", authRouter)
app.use("/api", userRouter)
app.use("/api", groupRouter)
app.use("/api", todoRouter)
app.use("/api", videoRouter)
app.use("/api", testRouter)
app.use("/api", postRouter)

const port = process.env.PORT || 5000
const URL = process.env.DB_URL

async function startApp() {
	try {
		await mongoose.connect(URL)
		app.listen(port, () => {
			console.log("Сервер запущен!")
		})
	} catch (e) {
		console.log(e)
	}
}

startApp()

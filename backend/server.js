require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const cookieparser = require("cookie-parser")
const authRouter = require("./routers/authRouter.js")
const userRouter = require("./routers/userRouter.js")
const groupRouter = require("./routers/groupRouter.js")
const todoRouter = require("./routers/todoRouter.js")

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieparser())

//routes

app.use("/api", authRouter)
app.use("/api", userRouter)
app.use("/api", groupRouter)
app.use("/api", todoRouter)

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

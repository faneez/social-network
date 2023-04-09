import React, { useState, useEffect } from "react"
import "./MessagePage.scss"
import { getDataApi, postDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { io } from "socket.io-client"
import { NoEncryption } from "@mui/icons-material"

const MessagePage = () => {
	const { auth } = useSelector((state) => state)

	const [users, setUsers] = useState([])
	const [value, setValue] = useState("")
	const [messages, setMessages] = useState([])
	const socket = useRef()
	const [receiver, setReceiver] = useState()
	const [usersLoading, setUsersLoading] = useState(true)
	const [messagesLoading, setMessagesLoading] = useState(true)
	const [arrivalMessage, setArrivalMessage] = useState()
	const scrollRef = useRef()
	useEffect(() => {
		try {
			setUsersLoading(true)
			getDataApi("users", auth.token).then((res) => {
				setUsers(res.data)
				setUsersLoading(false)
			})
		} catch (err) {
			setUsersLoading(false)
			console.error(err)
		}
	}, [])

	useEffect(() => {
		if (auth?.user?._id) {
			const IS_PROD = process.env.NODE_ENV === "production"
			const URL = IS_PROD ? "yoursite.herokuapp.com" : "http://localhost:5000"
			socket.current = io(URL)
			socket.current.emit("addUser", auth.user._id)
		}
	}, [auth.user._id])

	useEffect(() => {
		try {
			if (receiver) {
				setMessages("")
				setMessagesLoading(true)
				getDataApi(`message/${receiver._id}`, auth.token).then((res) => {
					setMessages(res.data)
					setMessagesLoading(false)
				})
			}
		} catch (err) {
			console.error(err)
			setMessagesLoading(false)
		}
	}, [receiver])

	const changeCurrentUser = (user) => {
		try {
			setReceiver(user)
		} catch (err) {
			console.log(err)
		}
	}

	const sendMessage = (e) => {
		try {
			e.preventDefault()
			if (!value) return false
			const message = {
				myself: true,
				message: value,
			}
			socket.current.emit("send-msg", {
				to: receiver._id,
				from: auth.user._id,
				message: value,
			})
			postDataApi(
				"message",
				{ to: receiver._id, message: value },
				auth.token
			).then((res) => {
				setValue("")
				setMessages(messages.concat(message))
			})
		} catch (err) {}
	}

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				setArrivalMessage({ myself: false, message: msg })
			})
		}
	}, [arrivalMessage])
	useEffect(() => {
		arrivalMessage && setMessages((messages) => [...messages, arrivalMessage])
	}, [arrivalMessage])
	return (
		<div className="message">
			<div className="message-container">
				<Link to="/home" className="home-link">
					Перейти на главную
				</Link>
				<div className="conversation-block">
					<input type="text" placeholder="Найти пользователя..." />
					<div className="conversation-block-items-container">
						{users.length === 0
							? ""
							: users.map((user) => {
									return (
										<div
											key={user._id}
											className="conversation-block-item"
											onClick={() => {
												changeCurrentUser(user)
											}}
										>
											<img
												src={user.avatar}
												alt="Аватар пользователя"
												className="conversation-block-item__avatar"
											/>
											<div>
												<p className="conversation-block-item__fullname">
													{`${user.name} ${user.surname}`}
												</p>
												<p>Отправить сообщение....</p>
											</div>
										</div>
									)
							  })}
					</div>
				</div>
				<div className="message-block">
					{!receiver ? (
						<h2 style={{ textAlign: "center", paddingTop: "50px" }}>
							Начните переписку с пользователем!
						</h2>
					) : (
						<div className="message-block__user-info">
							<Link to={`/user/${receiver._id}`}>
								<img src={receiver.avatar} className="avatar-profile" alt="" />
							</Link>
							<Link
								style={{ textDecoration: "none", color: "black" }}
								to={`/user/${receiver._id}`}
							>
								<p>{`${receiver.name} ${receiver.surname}`}</p>
							</Link>
						</div>
					)}

					<div className="message-block-messages">
						<div className="msgContainer">
							{messages.length === 0
								? ""
								: messages.map((message) => {
										return (
											<div ref={scrollRef}>
												{!message.myself ? (
													<div
														key={message._id}
														className="message-block-messages__item message-block-messages-item-from"
													>
														<img
															src={receiver.avatar}
															className="chat-user-profile"
															alt=""
														/>
														<p className="message-block-messages-item__message">
															{message.message}
														</p>
													</div>
												) : (
													<div
														key={message._id}
														className="message-block-messages__item message-block-messages-item-to"
													>
														<p className="message-block-messages-item__message">
															{message.message}
														</p>
													</div>
												)}
											</div>
										)
								  })}
						</div>

						<div className="message-block__form">
							<form onSubmit={sendMessage}>
								<input
									type="text"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									placeholder="Написать сообщение..."
								/>
								<button type="submit" className={value ? "active" : ""}>
									Отправить
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessagePage

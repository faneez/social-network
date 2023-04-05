import React, { useState, useEffect } from "react"
import { postDataApi } from "../utils/fetchDataApi"
import { login } from "../store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { refreshToken } from "../store/slices/authSlice"

import "../styles/Login.css"

const Login = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const initialState = { email: "", password: "" }
	const { auth, alert } = useSelector((state) => state)

	const [showpass, setShowpass] = useState(false)
	const [userData, setUserData] = useState(initialState)

	const { email, password } = userData
	const handleChange = (e) => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	useEffect(() => {
		if (auth.token) {
			navigate("/home")
		}
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			dispatch(login(userData))
		} catch (e) {
			console.log(e.response.data.msg)
		}
	}

	return (
		<div className="wrapper-login">
			<div className="login">
				<div className="login-container">
					<h3 className="login-header">IT куб</h3>
					<h6 className="login-subheader">Авторизация</h6>

					<form className="login-dataform" onSubmit={handleSubmit}>
						<input
							className="login-dataformemail"
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
							placeholder="Введите почту"
						></input>
						<input
							className="login-dataformpass"
							type={showpass ? "type" : "password"}
							placeholder="Введите пароль"
							value={password}
							name="password"
							onChange={handleChange}
						></input>

						<button className="login-dataformbtn" type="submit">
							{" "}
							Войти{" "}
						</button>
						<p className="login-small">
							Нет аккаунта? <Link to="/register">Зарегистрируйтесь!</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login

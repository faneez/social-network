import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { register } from "../store/slices/authSlice"

import "../styles/Register.css"

const Register = () => {
	const { auth, alert } = useSelector((state) => state)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (auth.token) {
			console.log(1)
			return navigate("/")
		}
	})

	const initialState = {
		name: "",
		surname: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "male",
		position: "student",
	}

	const [showpass, setShowpass] = useState(false)
	const [showcfpass, setShowcfpass] = useState(false)
	const [userData, setuserData] = useState(initialState)
	const {
		name,
		surname,
		email,
		password,
		confirmPassword,
		gender,
		position,
		group,
	} = userData

	const handleChange = (e) => {
		const { name, value } = e.target
		setuserData({ ...userData, [name]: value })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(register(userData))
	}

	return (
		<div className="wrapper-register">
			<div className="register">
				<div className="register-container">
					<h3 className="register-header">IT куб</h3>
					<h6 className="register-subheader">Регистрация</h6>

					<form className="register-dataform" onSubmit={handleSubmit}>
						<input
							className="register-dataformemail"
							type="text"
							value={name}
							name="name"
							placeholder={
								alert.surname ? `${alert.surname}` : "Введите ваше имя"
							}
							onChange={handleChange}
							style={{ background: `${alert.name ? "#fa8e96" : " "}` }}
						></input>

						<input
							className="register-dataformpass"
							type="text"
							name="surname"
							placeholder={
								alert.surname ? `${alert.surname}` : "Введите вашу фамилию"
							}
							value={surname}
							onChange={handleChange}
							style={{ background: `${alert.surname ? "#fa8e96" : " "}` }}
						></input>

						<input
							className="register-dataformpass"
							type="email"
							placeholder={alert.email ? `${alert.email}` : "Введите почту"}
							style={{ background: `${alert.email ? "#fa8e96" : " "}` }}
							value={email}
							name="email"
							onChange={handleChange}
						></input>

						<label
							htmlFor="
          "
							className="passwordInp"
						>
							<input
								className="register-dataformpass passwordInp"
								type={showpass ? "type" : "password"}
								placeholder={
									alert.password ? `${alert.password}` : "Введите пароль"
								}
								style={{ background: `${alert.password ? "#fa8e96" : " "}` }}
								value={password}
								name="password"
								onChange={handleChange}
							></input>
							<small
								className="register-showpass"
								onClick={() => setShowpass(!showpass)}
							>
								{" "}
								{showpass ? "скрыть" : "показать"}{" "}
							</small>
						</label>

						<label htmlFor="" className="passwordInp">
							<input
								className="register-dataformpass "
								type={showcfpass ? "type" : "password"}
								placeholder={
									alert.confirmPassword
										? `${alert.confirmPassword}`
										: "Введите пароль еще раз"
								}
								style={{
									background: `${alert.confirmPassword ? "#fa8e96" : " "}`,
								}}
								value={confirmPassword}
								name="confirmPassword"
								onChange={handleChange}
							></input>
							<small
								className="register-showcfpass"
								onClick={() => setShowcfpass(!showcfpass)}
							>
								{" "}
								{showcfpass ? "скрыть" : "показать"}{" "}
							</small>
						</label>
						<select
							className="register-dataformselect"
							name="position"
							value={position}
							onChange={handleChange}
						>
							<option value="Ученик">Ученик</option>
							<option value="Преподаватель">Преподаватель</option>
						</select>
						<select
							className="register-dataformselect"
							name="group"
							value={group}
							onChange={handleChange}
						>
							<option value="Python">Python</option>
							<option value="Мобильная разработка">
								Мобильная разработка
							</option>{" "}
							<option value="VR/AR">VR/AR приложения</option>
							<option value="Java">Java</option>
						</select>
						<select
							className="register-dataformselect"
							name="gender"
							value={gender}
							onChange={handleChange}
						>
							<option value="Мужчина">Мужчина</option>
							<option value="Женщина">Женщина</option>
						</select>

						<button className="register-dataformbtn" type="submit">
							{" "}
							Зарегистрироваться{" "}
						</button>
						<p className="register-small">
							Уже есть аккаунт? <Link to="/">Войдите</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register

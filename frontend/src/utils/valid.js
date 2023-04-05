const valid = ({ name, surname, email, password, confirmPassword }) => {
	const err = {}

	if (!name) {
		err.name = "Пожалуйста, заполните имя"
	} else if (name.length > 25) {
		err.name = "Имя должно быть не больше 25 символов"
	}

	if (!surname) {
		err.surname = "пожалуйста, добавьте фамилию"
	} else if (surname.replace(/ /g, "").length > 25) {
		err.surname = "фамилия должна быть не больше 25 символов"
	}

	if (!email) {
		err.email = "Пожалуйста, укажите почту"
	} else if (!validateEmail(email)) {
		err.email = "Некорректный формат почты"
	}

	if (!password) {
		err.password = "Пожалуйста, укажите пароль"
	} else if (password.length < 5) {
		err.password = "Длина пароля должна быть больше 5 символов "
	}

	if (password !== confirmPassword) {
		err.confirmPassword = "Пароли не совпадают "
	}

	return {
		errMsg: err,
		errLength: Object.keys(err).length,
	}
}

function validateEmail(email) {
	// eslint-disable-next-line
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export default valid

import React from "react"
import "../styles/NotFound.css"
import { Link } from "react-router-dom"
const NotFound = () => {
	return (
		<div className="notfound">
			<h2 className="notfound-text">Страница не найдена</h2>
			<p className="notfound-found">
				Вернуться на главную страницу
				<Link to="/" className="notfound-link">
					Клик
				</Link>
			</p>
		</div>
	)
}

export default NotFound

import React, { useEffect, useState } from "react"
import "./RatingPage.scss"
import { Link } from "react-router-dom"
import { getDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"

const RatingPage = () => {
	const { auth } = useSelector((state) => state)
	const [users, setUser] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		try {
			setIsLoading(true)
			getDataApi("rating", auth.token).then((res) => setUser(res.data))
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
		}
	}, [])

	if (isLoading) {
		return <p>Загрузка..</p>
	}
	return (
		<div className="rating">
			<div className="rating__container">
				<h2 className="rating__title">Общий рейтинг между учениками</h2>
				<p className="rating__subtitle">Топ 10</p>
				<table className="table_dark">
					<thead>
						<tr>
							<th>Место</th>
							<th>ФИО ученика</th>
							<th>Группа</th>
							<th>Рейтинг</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => {
							return (
								<tr key={user._id}>
									<td>{index + 1} место</td>
									<td>
										<Link>{`${user.name} ${user.surname}`}</Link>
									</td>
									<td>{user.group}</td>
									<td>{user.rating}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default RatingPage

import { useEffect, useState } from "react"
import "./tests.scss"
import { Link } from "react-router-dom"
import TryButton from "./TryButton"

import { getDataApi } from "./../../utils/fetchDataApi"
import { useSelector } from "react-redux"

const Tests = () => {
	const { auth } = useSelector((state) => state)
	const [tests, setTests] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const res = getDataApi("tests", auth.token).then((res) => {
			setTests(res.data)
			console.log(res.data)
			setIsLoading(false)
		})
	}, [])
	if (isLoading) {
		return <p>Загрузка тестов..</p>
	}
	return (
		<div className="tests">
			<div className="tests-container">
				<h2>Выберите тест</h2>
				<div className="items-container">
					{tests.map((test) => {
						return (
							<div key={test._id} className="tests__item">
								<h3 className="tests_item-name">Тема: {test.name}</h3>
								<img src={test.url} alt="" />

								<Link to={`/tests/${test._id}`}>Перейти к тесту</Link>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Tests

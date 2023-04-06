import "./test.scss"
import { useState, useEffect } from "react"
import { getDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// const questions = [
// 	{
// 		title: "React - это ... ?",
// 		variants: ["библиотека", "фреймворк", "приложение"],
// 		correct: 0,
// 	},
// 	{
// 		title: "Компонент - это ... ",
// 		variants: [
// 			"приложение",
// 			"часть приложения или страницы",
// 			"то, что я не знаю что такое",
// 		],
// 		correct: 1,
// 	},
// 	{
// 		title: "Что такое JSX?",
// 		variants: [
// 			"Это простой HTML",
// 			"Это функция",
// 			"Это тот же HTML, но с возможностью выполнять JS-код",
// 		],
// 		correct: 2,
// 	},
// ]

// const test = {
// 	questions,
// 	name: "Тест по React js",
// }

export function Result({ correctAnswers, test }) {
	return (
		<div className="result">
			<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
			<h2>Поздравляем!</h2>
			<h2>
				Вы ответили правильно на {correctAnswers} ответ(а) из{" "}
				{test.questions.length}
			</h2>
			<Link to="/tests">Вернуться к тестам</Link>
		</div>
	)
}

export function Game({ setTestName }) {
	const { auth } = useSelector((state) => state)
	const [test, setTest] = useState({})

	const [isLoading, setIsLoading] = useState(true)
	const [activeQuestion, setActiveQuestion] = useState(0)
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const [progressBar, setProgressBar] = useState(0)
	const { id } = useParams()

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const res = await getDataApi(`tests/${id}`, auth.token)
			setTest(res.data)
			setIsLoading(false)
			setTestName(res.data.name)
		}
		fetchData()
	}, [id])

	const changeQuestion = (index) => {
		if (isLoading) return false
		setProgressBar(((activeQuestion + 1) / test.questions.length) * 100)
		if (test.questions[activeQuestion].correct === index) {
			setCorrectAnswers((state) => state + 1)
		}
		setActiveQuestion((state) => state + 1)
	}
	if (!isLoading && activeQuestion > test.questions.length - 1) {
		return <Result correctAnswers={correctAnswers} test={test} />
	}
	if (isLoading) {
		return <p>Загрузка теста...</p>
	}
	if (test.questions) {
		return (
			<>
				<div className="progress">
					<div
						style={{ width: `${progressBar}%` }}
						className="progress__inner"
					></div>
				</div>

				<h1>{test.questions[activeQuestion].title}</h1>
				<ul>
					{test.questions[activeQuestion].variants.map((variant, index) => {
						return (
							<li
								key={index}
								onClick={() => changeQuestion(index, test.questions.length)}
							>
								{variant}
							</li>
						)
					})}
				</ul>
			</>
		)
	}
}

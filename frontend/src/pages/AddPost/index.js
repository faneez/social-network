import React, { useState, useRef } from "react"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import SimpleMDE from "react-simplemde-editor"

import "easymde/dist/easymde.min.css"
import styles from "./AddPost.module.scss"
import { patchDataApi, postDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

const AddPost = () => {
	const [imageUrl, setImageUrl] = useState()
	const [text, setText] = useState("")
	const [title, setTitle] = useState("")
	const [titleGroup, setTitleGroup] = useState("Программирование на Python")
	const [tags, setTags] = useState("")
	const inputFileRef = useRef(null)
	const [isLoading, setIsLoading] = useState(false)
	const { par } = useParams()

	const navigate = useNavigate()
	const { auth } = useSelector((state) => state)

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append("image", file)
			const res = await postDataApi("upload", formData)
			setImageUrl(res.data.url)
		} catch (e) {
			console.allert(e)
			alert("Произошла ошибка при загрузке файла")
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl("")
	}

	const onChange = React.useCallback((value) => {
		setText(value)
	}, [])

	const onSubmit = async () => {
		try {
			setIsLoading(true)
			let fields = {}
			if (par === "news") {
				fields = { title, imageUrl, tags, text }
				const res = await postDataApi("/posts", fields, auth.token)
				const id = res.data._id
				if (id) return navigate(`/posts/${id}`)
			} else if (par === "group") {
				fields = { title, imageUrl, tags, text, titleGroup }
				const { data } = await postDataApi("post-group", fields, auth.token)
				const id = data._id
				if (id) return navigate(`/group/${id}`)
			}
		} catch (err) {}
	}

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Введите текст...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	)

	return (
		<div className={styles.addPostContainer}>
			<Paper style={{ padding: 30 }}>
				<Button
					onClick={() => inputFileRef.current.click()}
					variant="outlined"
					size="large"
				>
					Загрузить превью
				</Button>
				<input
					ref={inputFileRef}
					type="file"
					onChange={handleChangeFile}
					hidden
				/>
				{imageUrl && (
					<>
						<Button
							variant="contained"
							color="error"
							onClick={onClickRemoveImage}
						>
							Удалить
						</Button>
						<img
							className={styles.image}
							src={`http://localhost:5000${imageUrl}`}
							alt="Uploaded"
						/>
					</>
				)}
				<br />
				<br />
				<TextField
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="Заголовок статьи..."
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Тэги"
					fullWidth
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>
				{par === "group" ? (
					<select
						name="group"
						value={titleGroup}
						onChange={(e) => {
							setTitleGroup(e.target.value)
						}}
						id=""
					>
						<option value="Программирование на Python">
							Программирование на Python
						</option>
						<option value="Мобильная разработка">Мобильная разработка</option>
						<option value="Разработка VR/AR приложений">
							Разработка VR/AR приложений
						</option>
						<option value="Программирование роботов">
							Программирование роботов
						</option>
						<option value="Системное администрирование">
							Системное администрирование
						</option>
						<option value="Кибергигиена">Кибергигиена</option>
					</select>
				) : (
					""
				)}
				<SimpleMDE
					className={styles.editor}
					value={text}
					onChange={onChange}
					options={options}
				/>
				<div className={styles.buttons}>
					<Button onClick={onSubmit} size="large" variant="contained">
						Опубликовать
					</Button>
					<a href="/">
						<Button size="large">Отмена</Button>
					</a>
				</div>
			</Paper>
		</div>
	)
}
export default AddPost

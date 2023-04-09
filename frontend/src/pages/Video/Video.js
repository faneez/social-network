import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
	deleteDataApi,
	getDataApi,
	patchDataApi,
	postDataApi,
} from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"
import VideoPlayer from "../../components/Video/VideoPlayer"
import CommentAvatar from "../../components/Images/Profile.png"
import "./video.scss"
const Video = () => {
	const { id } = useParams()
	const [video, setVideo] = useState({})
	const [text, setText] = useState("")
	const [comment, setComment] = useState("")
	const [comments, setComments] = []
	const [isLoading, setIsLoading] = useState(true)
	const { auth } = useSelector((state) => state)

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			try {
				const res = await getDataApi(`videos/${id}`, auth.token)
				setVideo(res.data)
				setIsLoading(false)
			} catch (e) {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [id])

	const deleteComment = async (commentId) => {
		try {
			const res = await patchDataApi(
				"video-comment",
				{ videoId: id, commentId },
				auth.token
			)
			setVideo(res.data)
		} catch (err) {}
	}
	const postComment = async () => {
		try {
			if (text) {
				const res = await postDataApi(
					"video-comment",
					{ videoId: id, text: text },
					auth.token
				)
				setText("")
				setVideo(res.data)
			} else {
				alert("Нужно написать что-нибудь!")
			}
		} catch (err) {}
	}

	if (isLoading) {
		return "Загрузка.."
	}
	return (
		<div className="video-container">
			<VideoPlayer video={video} />
			<div className="video-comments">
				<div className="input-label">
					<input
						type="text"
						value={text}
						onChange={(e) => {
							setText(e.target.value)
						}}
						placeholder="Оставить комментарий"
					/>
					<button onClick={postComment}>Отправить</button>
				</div>
				{video.comments.length == 0 ? (
					<p>Комментарий пока нет..</p>
				) : (
					video.comments.map((comment) => {
						return (
							<div key={comment._id} className="video-comments-block">
								<img
									src={comment.user.avatar}
									alt=""
									className="video-comments-block__avatar"
								/>
								<div className="video-comments-block__autor">
									<div className="video-comments-block__surname">
										{`${comment.user.name} ${comment.user.surname}`}
									</div>
									<div className="video-comments-block__text">
										{comment.text}
									</div>
								</div>
								<div
									className="video-comments-block__delete"
									onClick={() => {
										deleteComment(comment._id)
									}}
								>
									удалить
								</div>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default Video

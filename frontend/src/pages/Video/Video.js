import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"
import VideoPlayer from "../../components/Video/VideoPlayer"
import CommentAvatar from "../../components/Images/Profile.png"
import "./video.scss"
const Video = () => {
	const { id } = useParams()
	const [video, setVideo] = useState({})
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

	if (isLoading) {
		return "Загрузка.."
	}
	return (
		<div className="video-container">
			<VideoPlayer video={video} />
			<div className="video-comments">
				<div className="input-label">
					<input type="text" placeholder="Оставить комментарий" />
					<button>Отправить</button>
				</div>
				<div className="video-comments-block">
					<img
						src={CommentAvatar}
						alt=""
						className="video-comments-block__avatar"
					/>
					<div className="video-comments-block__autor">
						<div className="video-comments-block__surname">Дмитрий Южаков</div>
						<div className="video-comments-block__text">Классное видео!</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Video

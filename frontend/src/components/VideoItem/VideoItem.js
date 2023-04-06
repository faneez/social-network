import React from "react"
import { Link } from "react-router-dom"
import "./videoItem.scss"

const VideoItem = ({ video }) => {
	const { title, img } = video
	return (
		<Link to={`/videos/${video._id}`} className="videos__item videos-item">
			<img src={img} alt="Картинка видео" />
			<div className="videos-item__title">{title}</div>
		</Link>
	)
}

export default VideoItem

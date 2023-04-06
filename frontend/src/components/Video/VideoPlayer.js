import React from "react"
import { DefaultPlayer as Video } from "react-html5video"
import "react-html5video/dist/styles.css"

const VideoPlayer = ({ video }) => {
	return (
		// <iframe
		// 	width="560"
		// 	height="315"
		// 	src="https://www.youtube.com/embed/nLQ-9vfEjUI"
		// 	title="YouTube video player"
		// 	frameborder="0"
		// 	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		// 	allowfullscreen
		// ></iframe>
		<Video
			poster={video.img}
			controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
		>
			<source
				src={"http://localhost:5000/videos/python.webm"}
				type="video/webm"
			/>
		</Video>
	)
}

export default VideoPlayer

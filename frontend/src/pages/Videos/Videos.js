import React from "react"
import "./videos.scss"
import VideoItem from "../../components/VideoItem/VideoItem"
import CategoriesVideo from "../../components/Videos/CategoriesVideo"
import { getDataApi } from "../../utils/fetchDataApi"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import VideosSkeleton from "./VideosSkeleton"
import Loading from "../../components/Loading/Loading"

const Videos = () => {
	const [activeCategory, setActiveCategory] = useState("all")
	const [isLoading, setIsLoading] = useState(true)
	const [videos, setVideos] = useState([])
	const { auth } = useSelector((state) => state)
	useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			const res = await getDataApi(
				`videos?category=${activeCategory}`,
				auth.token
			)
			setVideos(res.data)
			setIsLoading(false)
		}
		fetchData()
	}, [activeCategory])
	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="videos">
			<div className="videos__container">
				<h2 className="videos__title">Обучение с помощью видеоуроков!</h2>
				<CategoriesVideo
					setActiveCategory={setActiveCategory}
					activeCategory={activeCategory}
				/>

				<div className="videos__items">
					{!isLoading
						? videos.map((video) => {
								return <VideoItem key={video._id} video={video} />
						  })
						: ""}
				</div>
			</div>
		</div>
	)
}

export default Videos

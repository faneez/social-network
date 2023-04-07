import React, { useEffect } from "react"

import { Post } from "../../components/Post"
import { Index } from "../../components/AddComment"
import { CommentsBlock } from "../../components/CommentsBlock"
import styles from "./PostPage.module.scss"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { getDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"

const PostPage = () => {
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(true)
	const { auth } = useSelector((state) => state)

	const [data, setData] = useState({})

	useEffect(() => {
		setIsLoading(true)
		getDataApi(`posts/${id}`, auth.token)
			.then((res) => {
				setData(res.data)
				setIsLoading(false)
			})
			.catch((err) => {
				console.warn(err)
				setIsLoading(false)
			})
	}, [id])
	if (isLoading) {
		return (
			<div className={styles.postPageContainer}>
				<Post isLoading={isLoading}></Post>{" "}
			</div>
		)
	}
	return (
		<div className={styles.postPageContainer}>
			<Post
				id={1}
				title={data.title}
				imageUrl={data.imageUrl}
				user={{
					avatarUrl: data.user.avatar,
					fullName: `${data.user.name} ${data.user.surname}`,
				}}
				createdAt={data.createdAt}
				viewsCount={data.viewsCount}
				commentsCount={data.comments.length}
				tags={data.tags}
				isFullPost
			>
				<p>{data.text}</p>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: "Вася Вася",
							avatarUrl: data.avatar,
						},
						text: "Это тестовый комментарий 555555",
					},
					{
						user: {
							fullName: "Иван Иванов",
							avatarUrl: data.avatar,
						},
						text: "Какая калссная статья",
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
		</div>
	)
}
export default PostPage

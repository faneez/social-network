import React, { useEffect, useState } from "react"
import "./group.scss"
import { useParams } from "react-router-dom"
import { getDataApi } from "../../utils/fetchDataApi"
import { useSelector } from "react-redux"

import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import styles from "../Home/home.module.scss"
import { Post } from "../../components/Post"
import { TagsBlock } from "../../components/TagsBlock"
import { useDispatch } from "react-redux"
import { getPostTags, getPosts } from "../../store/slices/postSlice"
import { Link } from "react-router-dom"

const Group = () => {
	const [group, setGroup] = useState({})
	const { auth } = useSelector((state) => state)
	const [isLoading, setIsLoading] = useState(true)
	const { id } = useParams()
	useEffect(() => {
		try {
			getDataApi(`groups/${id}`, auth.token).then((res) => {
				setGroup(res.data)
				console.log(res.data)
				setIsLoading(false)
			})
		} catch (err) {
			setIsLoading(false)
		}
	}, [])

	return (
		<div className={styles.homeContainer}>
			<div style={{ display: "flex" }}>
				<Tabs
					style={{ marginBottom: 15 }}
					value={0}
					aria-label="basic tabs example"
				>
					<Tab label="Новые" />
					<Tab label="Популярные" />
				</Tabs>
				<Link to="/add-post/group">
					<div className={styles.writeLink}>Создать статью</div>
				</Link>
			</div>
			<Grid container spacing={4} style={{ marinLeft: "100px" }}>
				<Grid xs={7} item>
					{(isLoading ? [...Array(5)] : group.posts).map((post, index) =>
						isLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={post._id}
								isGroupPost={true}
								key={post._id}
								title={post.title}
								imageUrl={post.imageUrl ? post.imageUrl : ""}
								user={{
									avatarUrl: post.user.avatar,
									fullName: `${post.user.name} ${post.user.surname} `,
									userId: post.user._id,
									token: auth.token,
								}}
								createdAt={post.createdAt}
								viewsCount={post.viewsCount}
								commentsCount={post.comments.length}
								tags={post.tags}
								isAuthor={post.user._id === auth.user._id}
								isEditable
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					{/* <TagsBlock
						items={!isLoading && group.posts.length > 0 ? group.posts.tags : []}
						isLoading={isLoading}
					/> */}
				</Grid>
			</Grid>
		</div>
	)
}

export default Group

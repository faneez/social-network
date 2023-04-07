import React, { useEffect } from "react"
import Grid from "@mui/material/Grid"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import styles from "./home.module.scss"
import { Post } from "../../components/Post"
import { TagsBlock } from "../../components/TagsBlock"
import { useSelector, useDispatch } from "react-redux"
import { getPostTags, getPosts } from "../../store/slices/postSlice"
import { Link } from "react-router-dom"

const Home = () => {
	const { auth } = useSelector((state) => state)

	const { posts, tags } = useSelector((state) => state.posts)
	const isPostsLoading = posts.status === "loading"
	const isTagsLoading = tags.status === "loading"

	const dispatch = useDispatch()
	useEffect(() => {
		if (auth.token) {
			dispatch(getPosts({ token: auth.token }))
			dispatch(getPostTags({ token: auth.token }))
		}
	}, [auth])
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
				<Link to="/add-post/news">
					<div className={styles.writeLink}>Написать что-нибудь...</div>
				</Link>
			</div>
			<Grid container spacing={4} style={{ marinLeft: "100px" }}>
				<Grid xs={7} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								id={post._id}
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
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
				</Grid>
			</Grid>
		</div>
	)
}
export default Home

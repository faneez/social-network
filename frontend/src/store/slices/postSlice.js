import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { deleteDataApi, getDataApi } from "../../utils/fetchDataApi"

const initialState = {
	posts: {
		items: [],
		status: "loading",
	},
	tags: {
		items: [],
		status: "loading",
	},
}

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async ({ token }) => {
		const res = await getDataApi("posts", token)
		return res.data
	}
)

export const getPostTags = createAsyncThunk(
	"tags/getPostsTags",
	async ({ token }) => {
		const res = await getDataApi("tags", token)
		return res.data
	}
)

export const removePost = createAsyncThunk(
	"posts/removePost",
	async ({ token, id }, thunkAPI) => {
		const res = await deleteDataApi(`posts/${id}`, token)
		thunkAPI.dispatch(getPostTags({ token }))
		return res.data
	}
)

const postSlice = createSlice({
	name: "posts",
	initialState,
	recuders: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPosts.fulfilled, (state, action) => {
				state.posts.items = action.payload
				state.posts.status = "loaded"
			})
			.addCase(getPosts.pending, (state) => {
				state.posts.status = "loading"
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.posts.items = []
				state.posts.status = "error"
			})
			.addCase(getPostTags.fulfilled, (state, action) => {
				state.tags.items = action.payload
				state.tags.status = "loaded"
			})
			.addCase(getPostTags.pending, (state) => {
				state.tags.status = "loading"
			})
			.addCase(getPostTags.rejected, (state, action) => {
				state.tags.items = []
				state.tags.status = "error"
			})
			.addCase(removePost.fulfilled, (state, action) => {
				state.posts.status = "loaded"
				state.posts.items = action.payload
			})
			.addCase(removePost.pending, (state) => {
				state.posts.status = "loaded"
			})
			.addCase(removePost.rejected, (state) => {
				state.posts.status = "error"
			})
	},
})

export default postSlice.reducer

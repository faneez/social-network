import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	deleteDataApi,
	getDataApi,
	patchDataApi,
	postDataApi,
} from "../../utils/fetchDataApi"

const initialState = {
	items: [],
	loading: false,
}
export const createTodo = createAsyncThunk(
	"todos/create",
	async ({ title, token }) => {
		const res = await postDataApi("todos", { title }, token)
		return res.data
	}
)
export const getTodos = createAsyncThunk("todos/get", async ({ token }) => {
	const res = await getDataApi("todos", token)
	return res.data
})

export const deleteTodo = createAsyncThunk(
	"todos/delete",
	async ({ id, token }) => {
		const res = await deleteDataApi(`todos/${id}`, token)
		return res.data
	}
)

export const changeStatus = createAsyncThunk(
	"todos/changeStatus",
	async ({ status, id, token }) => {
		const res = await patchDataApi(`todos/${id}`, { status }, token)

		return res.data
	}
)
const sliceTodo = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createTodo.pending, (state) => {
				state.loading = true
			})
			.addCase(createTodo.rejected, (state) => {
				state.loading = false
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.items = action.payload
				state.loading = false
			})
			.addCase(getTodos.fulfilled, (state, action) => {
				state.items = action.payload
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.items = action.payload
			})
			.addCase(changeStatus.fulfilled, (state, action) => {
				state.items = action.payload
			})
	},
})

export default sliceTodo.reducer

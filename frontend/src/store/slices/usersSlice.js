import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDataApi } from "../../utils/fetchDataApi"

const initialState = {
	items: [],
	loading: false,
}
export const getUsers = createAsyncThunk(
	"users/getAll",
	async ({ token, search }) => {
		const res = await getDataApi(`users?search=${search}`, token)
		return res.data
	}
)

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: () => {},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
			})
			.addCase(getUsers.rejected, (state) => {
				state.loading = false
			})
			.addCase(getUsers.pending, (state) => {
				state.loading = true
			})
	},
})

export default usersSlice.reducer

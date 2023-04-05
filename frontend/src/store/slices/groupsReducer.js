import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getDataApi } from "../../utils/fetchDataApi"

const initialState = {
	items: [],
	loading: false,
}
export const getGroups = createAsyncThunk(
	"groups/findAll",
	async ({ token }) => {
		const res = await getDataApi("groups", token)
		return res.data
	}
)

const sliceGroups = createSlice({
	name: "groups",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getGroups.pending, (state) => {
				state.loading = true
			})
			.addCase(getGroups.rejected, (state) => {
				state.loading = false
			})
			.addCase(getGroups.fulfilled, (state, action) => {
				state.items = action.payload
				state.loading = false
			})
	},
})

export default sliceGroups.reducer

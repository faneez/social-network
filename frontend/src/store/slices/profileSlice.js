import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDataApi } from "../../utils/fetchDataApi"

const initialState = { user: {}, loading: false }

export const getUser = createAsyncThunk(
	"profile/getUser",
	async ({ id, token }, thunkAPI) => {
		try {
			const res = await getDataApi(`users/${id}`, token)

			return res.data
		} catch (e) {}
	}
)

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		// getUser: (state, action) => {
		// 	console.log(1)
		// 	return action.payload
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.loading = true
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
			})
			.addCase(getUser.rejected, (state) => {
				state.loading = false
			})
	},
})

export default profileSlice.reducer

// export const {  } = profileSlice.actions

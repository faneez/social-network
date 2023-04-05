import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postDataApi } from "../../utils/fetchDataApi"
import { sendAlert } from "./alertSlice"
import valid from "../../utils/valid"

const initialState = { user: "", token: "" }
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
	try {
		thunkAPI.dispatch(sendAlert({ loading: true }))
		const res = await postDataApi("login", data)
		localStorage.setItem("login", true)
		thunkAPI.dispatch(sendAlert(""))
		return res.data
	} catch (e) {
		thunkAPI.dispatch(sendAlert({ error: e.response.data.msg }))
	}
})

export const register = createAsyncThunk(
	"auth/register",
	async (data, thunkAPI) => {
		const { errMsg, errLength } = valid(data)

		if (errLength > 0) {
			thunkAPI.dispatch(sendAlert(errMsg))
		}

		const res = await postDataApi("register", data)
		localStorage.setItem("login", true)
		return res.data
	}
)
export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
	const res = await postDataApi("logout")

	localStorage.removeItem("login")
	return res.data
})
export const refreshToken = createAsyncThunk(
	"auth/refreshToken",
	async (_, thunkAPI) => {
		const login = localStorage.getItem("login")

		if (login) {
			try {
				thunkAPI.dispatch(sendAlert({ loading: true }))
				const res = await postDataApi("refresh_token")
				thunkAPI.dispatch(sendAlert({}))
				return res.data
			} catch (e) {
				thunkAPI.dispatch(sendAlert({ error: e.response.data.msg }))
			}
		}
	}
)
const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				return { ...action.payload }
			})
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				return { ...action.payload }
			})
			.addCase(logout.fulfilled, (state, action) => {
				return {}
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				return { ...action.payload }
			})
	},
})

export default authSlice.reducer

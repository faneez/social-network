import { createSlice } from "@reduxjs/toolkit"

const initialState = { error: "", success: "", loading: false }

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		sendAlert: (state, action) => {
			console.log(1)
			return action.payload
		},
	},
})

export default alertSlice.reducer

export const { sendAlert } = alertSlice.actions

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import alertReducer from "./slices/alertSlice"
import profileReducer from "./slices/profileSlice"
import groupsReducer from "./slices/groupsReducer"
import todoReducer from "./slices/todoSlice.js"
import usersReducer from "./slices/usersSlice.js"
import postsReducer from "./slices/postSlice.js"

const rootReducer = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	profile: profileReducer,
	groups: groupsReducer,
	todos: todoReducer,
	users: usersReducer,
	posts: postsReducer,
})
export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
})

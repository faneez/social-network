import "./App.css"
import Home from "./pages/Home/Home"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useLocation } from "react-router-dom"

import NotFound from "./pages/NotFound"
import Alert from "./components/Alert/AlertUI.js"
import Group from "./pages/Group/Group"
import Groups from "./pages/Groups/Groups"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { refreshToken } from "./store/slices/authSlice"
import Navbar from "./components/Navbar/Navbar"
import Videos from "./pages/Videos/Videos"
import Video from "./pages/Video/Video"
import TestsPage from "./pages/Tests/TestsPage"
import TestPage from "./pages/Test/TestPage"
import UsersPage from "./pages/Users/UsersPage"
import PostPage from "./pages/PostPage/PostPage"
import AddPost from "./pages/AddPost"
import RatingPage from "./pages/RatingPage/RatingPage"
import MessagePage from "./pages/MessagePage/MessagePage"

import { useSelector } from "react-redux"
import Loading from "./components/Loading/Loading"
import Profile from "./pages/Profile/Profile"
import Leftbar from "./components/LefttsideContainer/Leftbar"

function App() {
	const location = useLocation()
	const dispatch = useDispatch()
	const { alert, auth } = useSelector((state) => state)
	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch])

	return (
		<div className="App">
			{auth.token ? <Navbar /> : ""}
			{alert ? <Alert /> : ""}

			<div style={{ display: "flex" }}>
				{auth.token && !location.pathname.includes("/chat") ? <Leftbar /> : ""}
				<div className="main-content">
					<Routes>
						<Route path="/" element={auth.token ? <Home /> : <Login />} />
						<Route path="/loading" element={<Loading />} />
						<Route
							path="/posts/:id"
							element={auth.token ? <PostPage /> : <Login />}
						/>
						<Route
							path="/add-post/:par"
							element={auth.token ? <AddPost /> : <Login />}
						/>
						<Route
							path="/chat"
							element={auth.token ? <MessagePage /> : <Login />}
						/>

						<Route
							path="/videos"
							element={auth.token ? <Videos /> : <Login />}
						/>
						<Route
							path="/videos/:id"
							element={auth.token ? <Video /> : <Login />}
						/>
						<Route
							path="/tests"
							element={auth.token ? <TestsPage /> : <Login />}
						/>
						<Route
							path="/tests/:id"
							element={auth.token ? <TestPage /> : <Login />}
						/>
						<Route
							path="/users"
							element={auth.token ? <UsersPage /> : <Login />}
						/>
						<Route
							path="/groups"
							element={auth.token ? <Groups /> : <Login />}
						/>
						<Route
							path="/group/:id"
							element={auth.token ? <Group /> : <Login />}
						/>
						<Route
							path="/rating"
							element={auth.token ? <RatingPage /> : <Login />}
						/>
						<Route path="/home" element={<Home />} />
						<Route
							path="/user/:id"
							element={auth.token ? <Profile /> : <Login />}
						/>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App

import "./App.css"
import Home from "./pages/Home/Home"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Post from "./pages/Post"
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
import Tests from "./pages/Tests/Tests"

import { useSelector } from "react-redux"
import Loading from "./components/Loading/Loading"
import Profile from "./pages/Profile/Profile"
import Leftbar from "./components/LefttsideContainer/Leftbar"

function App() {
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
				{auth.token ? <Leftbar /> : ""}
				<div className="main-content">
					<Routes>
						<Route path="/" element={auth.token ? <Home /> : <Login />} />
						<Route path="/loading" element={<Loading />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/videos"
							element={auth.token ? <Videos /> : <Login />}
						/>
						<Route
							path="/videos/:id"
							element={auth.token ? <Video /> : <Login />}
						/>
						<Route path="/login" element={auth.token ? <Home /> : <Login />} />
						<Route
							path="/groups"
							element={auth.token ? <Groups /> : <Login />}
						/>
						<Route
							path="/group/:id"
							element={auth.token ? <Group /> : <Login />}
						/>
						<Route path="/home" element={<Home />} />
						<Route
							path="/user/:id"
							element={auth.token ? <Profile /> : <Login />}
						/>
						<Route path="/post/:id" element={<Post />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App

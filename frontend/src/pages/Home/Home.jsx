import React from "react"
import styles from "./home.module.scss"
import Navbar from "../../components/Navbar/Navbar"
import Rightbar from "../../components/LeftsideContainer/Rightbar"
import MainPost from "../../components/MainPostContainer/MainPost"
import Leftbar from "../../components/LefttsideContainer/Leftbar"

const Home = () => {
	return (
		<div className={styles.root}>
			<div className={styles.componentContainer}>
				<MainPost />
				<Rightbar />
			</div>
		</div>
	)
}

export default Home

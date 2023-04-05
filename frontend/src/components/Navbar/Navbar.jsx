import React from "react"
import styles from "./navbar.module.scss"
import searchIcon from "../Images/search.png"
import Notifications from "../Images/bell.png"
import Message from "../Images/message.png"
import logo from "../Images/it-cube-logo.png"
import ProfileImage from "../Images/Profile.png"
import MenuList from "./MenuList/MenuList"
import { Link } from "react-router-dom"
import { logout } from "../../store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { auth } = useSelector((state) => state)
	return (
		<div className={styles.root}>
			<div className={styles.logoContainer}>
				<Link to="/">
					<img className={styles.logo} src={logo} alt="" />
				</Link>
			</div>
			{/* <MenuList /> */}
			<div className={styles.inputContainer}>
				<img
					src={searchIcon}
					alt="search icon"
					className={`${styles.icons} ${styles.searchIcon}`}
				/>
				<input
					placeholder="Поиск людей"
					type="text"
					className={styles.searchInput}
				/>
			</div>
			<div className={styles.iconsContainer}>
				<img
					src={Notifications}
					alt="notifications icon"
					className={styles.icons}
				/>

				<img src={Message} alt="message icon" className={styles.icons} />
				<div className={styles.profileContainer}>
					<Link to={`/user/${auth.user._id}`}>
						<img
							src={auth.user.avatar}
							alt=""
							className={styles.profileImage}
						/>
					</Link>
					<span
						className={styles.logout}
						onClick={() => {
							dispatch(logout())
						}}
					>
						Выйти
					</span>
				</div>
			</div>
		</div>
	)
}

export default Navbar

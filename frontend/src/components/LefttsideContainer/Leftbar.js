import React from "react"
import styles from "./leftbar.module.scss"
import newsImage from "../Images/news-icon.png"
import chatsImage from "../Images/chats-icon.png"
import friendsImage from "../Images/friends-icon.png"
import groupsImage from "../Images/groups-icon.png"
import videosImage from "../Images/videos-icon.png"
import testImage from "../Images/test-icon.png"
import ratingImage from "../Images/rating-icon.png"
import profileImage from "../Images/profile-icon.png"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Leftbar = ({ bg, color }) => {
	const { auth } = useSelector((state) => state)
	return (
		<div className={styles.leftbarContainer}>
			<ul className={styles.list}>
				<Link to={`/user/${auth.user._id}`}>
					<img src={profileImage} className={styles.icon} alt="Мой профиль" />
					<li className={styles.item}>Мой профиль</li> {/* Мой профиль*/}
				</Link>
				<a href="#">
					<img src={newsImage} className={styles.icon} alt="публикации" />
					<li className={styles.item}>Публикации</li> {/* Посты*/}
				</a>
				<a href="#">
					<img src={chatsImage} className={styles.icon} alt="чат" />
					<li className={styles.item}>Чат</li> {/* чаты*/}
				</a>
				<a href="#">
					<img src={friendsImage} className={styles.icon} alt="" />
					<li className={styles.item}>Мои друзья</li> {/* Мои друзья*/}
				</a>
				<Link to="/groups">
					<img src={groupsImage} className={styles.icon} alt="" />
					<li className={styles.item}>Группы</li> {/* Группы*/}
				</Link>
				<Link to="/videos">
					<img src={videosImage} className={styles.icon} alt="" />
					<li className={styles.item}>Видео</li> {/* Видео*/}
				</Link>
				<a href="#">
					<img src={testImage} className={styles.icon} alt="" />
					<li className={styles.item}>Тесты</li> {/* тесты */}
				</a>
				<a href="#">
					<img src={ratingImage} className={styles.icon} alt="" />
					<li className={styles.item}>Рейтинг</li> {/* рейтинг */}
				</a>
			</ul>
			<hr />
		</div>
	)
}

export default Leftbar

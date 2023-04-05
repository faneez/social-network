import React from "react"
import styles from "../navbar.module.scss"
import newsImage from "../../Images/news-icon.png"
import chatsImage from "../../Images/chats-icon.png"
import friendsImage from "../../Images/friends-icon.png"
import groupsImage from "../../Images/groups-icon.png"
import videosImage from "../../Images/videos-icon.png"
import testImage from "../../Images/test-icon.png"
import ratingImage from "../../Images/rating-icon.png"

const MenuList = () => {
	return (
		<ul className={styles.menuContainer}>
			<li>
				<img src={newsImage} alt="Новости" /> {/* Новости */}
			</li>
			<li>
				<img src={chatsImage} alt="Чаты" /> {/* Чаты */}
			</li>
			<li>
				<img src={friendsImage} alt="Друзья" /> {/* Друзья */}
			</li>
			<li>
				<img src={groupsImage} alt="Группы" /> {/* Группы */}
			</li>
			<li>
				<img src={videosImage} alt="Видео" /> {/* Видео */}
			</li>
			<li>
				<img src={testImage} alt="Тесты" /> {/* Тесты */}
			</li>
			<li>
				<img src={ratingImage} alt="Рейтинг" /> {/* Рейтинг */}
			</li>
		</ul>
	)
}

export default MenuList

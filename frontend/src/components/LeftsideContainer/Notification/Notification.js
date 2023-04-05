import styles from "../leftbar.module.scss"
import image from "../../Images/Profile.png"

import React from "react"

const Notification = () => {
	return (
		<div className={styles.notificationContainer}>
			<div className={styles.notificationsHeader}>
				<p>Уведомления</p>
				<p>Все</p>
			</div>
			<div className={styles.notificationsContent}>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Дмитрий лайкнул ваш пост</p>
						<img src={image} className={styles.likeImg} alt="" />
					</div>
				</div>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Алексей подписался на вас</p>
						<img src={image} className={styles.followingUserImg} alt="" />
					</div>
				</div>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Дмитрий лайкнул ваш пост</p>
						<img src={image} className={styles.likeImg} alt="" />
					</div>
				</div>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Алексей подписался на вас</p>
						<img src={image} className={styles.followingUserImg} alt="" />
					</div>
				</div>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Дмитрий лайкнул ваш пост</p>
						<img src={image} className={styles.likeImg} alt="" />
					</div>
				</div>
				<div className={styles.item}>
					<img src={image} className={styles.avatarImg} alt="" />
					<div className={styles.itemText}>
						<p className={styles.notificationMsg}>Алексей подписался на вас</p>
						<img src={image} className={styles.followingUserImg} alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Notification

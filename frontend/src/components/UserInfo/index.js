import React from "react"
import styles from "./UserInfo.module.scss"
import { Link } from "react-router-dom"

export const UserInfo = ({ avatarUrl, fullName, additionalText, userId }) => {
	return (
		<div className={styles.root}>
			<img
				className={styles.avatar}
				src={avatarUrl || "/noavatar.png"}
				alt={fullName}
			/>
			<div className={styles.userDetails}>
				<Link to={`/user/${userId}`}>
					<span className={styles.userName}>{fullName}</span>
				</Link>
				<span className={styles.additional}>{additionalText}</span>
			</div>
		</div>
	)
}

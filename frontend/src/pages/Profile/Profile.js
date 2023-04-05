import styles from "./profile.module.scss"

import { useState } from "react"

import UserProfile from "../../components/UserProfile/UserProfile"
import Todo from "../../components/ToDo/Todo"

const Profile = () => {
	const [hideToDo, setHideToDo] = useState(false)
	return (
		<div className={styles.profileWrapper}>
			<div className={styles.container}>
				<div className={styles.profileContainer}>
					<div className={styles.userProfile}>
						<UserProfile setHideToDo={setHideToDo} />
					</div>
					<div className={styles.toDo}>{hideToDo ? "" : <Todo />}</div>
				</div>
			</div>
		</div>
	)
}

export default Profile

import React from "react"
import styles from "./leftbar.module.scss"
import Todo from "./ToDo/Todo"

import Notification from "./Notification/Notification"
const Rightbar = () => {
	return (
		<div className={styles.root}>
			{/* <Todo /> */}
			<Notification />
		</div>
	)
}

export default Rightbar

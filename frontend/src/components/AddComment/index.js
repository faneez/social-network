import React from "react"

import styles from "./AddComment.module.scss"

import TextField from "@mui/material/TextField"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"

export const Index = () => {
	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src="https://crypto.ru/wp-content/plugins/q-auth/assets/img/default-user.png"
				/>
				<div className={styles.form}>
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button variant="contained">Отправить</Button>
				</div>
			</div>
		</>
	)
}

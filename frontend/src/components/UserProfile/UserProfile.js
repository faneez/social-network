import React, { useEffect, useState } from "react"
import styles from "./userPofile.module.scss"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUser } from "../../store/slices/profileSlice"
import { useDispatch } from "react-redux"
import UserLoading from "./userLoading"

const UserProfile = ({ setHideToDo }) => {
	const { auth, profile } = useSelector((state) => state)
	const { id } = useParams()
	const dispatch = useDispatch()
	const [itsMe, setItsMe] = useState(false)

	useEffect(() => {
		if (auth.user._id === id) {
			setItsMe(true)
			setHideToDo(false)
			dispatch(getUser({ id, token: auth.token }))
		} else {
			setItsMe(false)
			setHideToDo(true)
			dispatch(getUser({ id, token: auth.token }))
		}
	}, [id])

	if (profile.loading) {
		return <UserLoading />
	} else {
		return (
			<div className={styles.userProfileContainer}>
				<div style={{ display: "flex" }}>
					<div className={styles.userMain}>
						<img
							className={styles.userImage}
							src={profile.user.avatar}
							alt="Аватар пользователя"
						/>

						<div className={styles.userFullname}>
							{profile.user.name + " " + profile.user.surname}
						</div>
						<div className={styles.userPosition}>{profile.user.position}</div>
						<div className={styles.profileBtns}>
							{itsMe ? (
								<a href="#">Редактировать профиль</a>
							) : (
								<>
									<a
										href="#"
										style={{
											marginRight: "20px",
											backgroundColor: "green",
										}}
									>
										Добавить в друзья
									</a>
									<a href="#">Отправить сообщение</a>
								</>
							)}
						</div>
					</div>
					<div className={styles.userContacts}>
						<div className={styles.userContactItem}>
							Имя и фамилия:{" "}
							<span>{profile.user.name + " " + profile.user.surname}</span>
						</div>
						<div className={styles.userContactItem}>
							Почта: <span>{profile.user.email}</span>
						</div>
						<div className={styles.userContactItem}>
							Телефон: <span>{profile.user.phone || "Телефон не указан"}</span>
						</div>
						<div className={styles.userContactItem}>
							Адрес: <span>{profile.user.address || "Адрес не указан"}</span>
						</div>
						<div className={styles.userContactItem}>
							Рейтинг: <span>{profile.user.rating}</span>
						</div>
					</div>
				</div>
				<div className={styles.userSkillsContainer}>
					<div className={styles.userSkills}>
						<div className={styles.skillTitle}>
							Изученные <span>навыки</span>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>Python</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "30%" }}
							></div>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>Java</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "60%" }}
							></div>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>Мобильная разработка</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "80%" }}
							></div>
						</div>
					</div>
					<div className={styles.userSkills}>
						<div className={styles.skillTitle}>
							Изученные <span>навыки</span>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>
								Разработка VR/AR приложений
							</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "30%" }}
							></div>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>Big DATA</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "70%" }}
							></div>
						</div>
						<div className={styles.item}>
							<div className={styles.itemTitle}>Базовый C язык</div>
							<div className={styles.fullProgress}></div>
							<div
								className={styles.userProgress}
								style={{ width: "10%" }}
							></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserProfile

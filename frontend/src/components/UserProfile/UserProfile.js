import React, { useEffect, useState, useRef } from "react"
import styles from "./userPofile.module.scss"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUser } from "../../store/slices/profileSlice"
import { useDispatch } from "react-redux"
import UserLoading from "./userLoading"
import { postDataApi } from "../../utils/fetchDataApi"

const UserProfile = ({ setHideToDo }) => {
	const { auth, profile } = useSelector((state) => state)
	const { id } = useParams()
	const dispatch = useDispatch()
	const [itsMe, setItsMe] = useState(false)
	const imageRef = useRef()
	const navigate = useNavigate()

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

	const handlerImageUpload = async (e) => {
		const formData = new FormData()
		const file = e.target.files[0]
		formData.append("image", file)
		const res = await postDataApi("upload", formData)
		const fileUrl = `http://localhost:5000${res.data.url}`
		console.log(fileUrl)
		const resAvatar = await postDataApi(
			"avatar",
			{ avatar: fileUrl },
			auth.token
		)
		if (resAvatar.data.success) {
			window.location.reload()
		}
	}

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
								<>
									<span
										className={styles.changePhoto}
										onClick={() => {
											imageRef.current.click()
										}}
									>
										Обновить фотографию
									</span>
									<input
										onChange={handlerImageUpload}
										ref={imageRef}
										type="file"
										hidden
										className=""
									/>
									<span>Редактировать профиль</span>
								</>
							) : (
								<>
									{/* <a
										href="#"
										style={{
											backgroundColor: "green",
										}}
									>
										Добавить в друзья
									</a> */}
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
							Пол: <span>{profile.user.gender || "Пол не указан"}</span>
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

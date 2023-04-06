import React, { useEffect, useState } from "react"
import "./users.scss"
import searchImg from "../Images/search.png"
import UsersItem from "./UsersItem"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../store/slices/usersSlice"

const Users = () => {
	const { auth, users } = useSelector((state) => state)

	const dispatch = useDispatch()
	const [searchUsers, setSearchUsers] = useState("")
	useEffect(() => {
		dispatch(getUsers({ token: auth.token, search: searchUsers }))
	}, [searchUsers])

	const search = (e) => {
		setSearchUsers(e.target.value)
	}

	const returnData = (loading) => {
		if (loading) {
			return (loading = <p>Загрузка..</p>)
		} else {
			return users.items.map((user) => {
				return <UsersItem key={user._id} user={user} />
			})
		}
	}

	return (
		<div className="users">
			<div className="users-container">
				<h2 className="users__title">Пользователи</h2>
				<div className="search-input">
					<input
						type="text"
						value={searchUsers}
						onChange={search}
						placeholder="Найти людей..."
						className="users__input"
					/>
					<img
						src={searchImg}
						alt="Иконка поиска"
						className="groups__input-img"
					/>
				</div>
				{returnData(users.loading)}
			</div>
		</div>
	)
}

export default Users

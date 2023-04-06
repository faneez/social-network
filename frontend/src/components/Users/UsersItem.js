import React, { useEffect } from "react"
import profileImage from "../Images/Profile.png"
import { Link } from "react-router-dom"

const UsersItem = ({ user }) => {
	return (
		<div className="users__item users-item">
			<div>
				<Link to={`/user/${user._id}`}>
					<img
						className="users-item__img"
						src={profileImage}
						alt="Аватар пользователья"
					/>
				</Link>
			</div>
			<div>
				<Link
					to={`/user/${user._id}`}
					className="users-item__fullname"
				>{`${user.name} ${user.surname}`}</Link>
				<div className="users-item__position">{user.position}</div>
				<div className="users-item__position">{user.group}</div>
			</div>
			<Link className="users-item__message">Написать сообщение</Link>
		</div>
	)
}

export default UsersItem

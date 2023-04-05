import React from "react"

import { Link } from "react-router-dom"

const GroupsItem = ({ group }) => {
	const { title, description, avatar } = group
	return (
		<div className="group-item">
			<Link to="/group/1">
				<img src={avatar} alt="Аватар группы" className="group-item__avatar" />
			</Link>
			<div className="group-item__text">
				<div className="group-item__name">
					<Link to="/group/1">{title}</Link>
				</div>
				<div className="group-item__description">{description}</div>
			</div>
			<Link to="/group/1" className="group-item__btn">
				Перейти в группу
			</Link>
		</div>
	)
}

export default GroupsItem

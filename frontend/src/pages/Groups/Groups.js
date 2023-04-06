import React from "react"
import "./groups.scss"
import GroupsItem from "./GroupsItem"

import searchImg from "../../components/Images/search.png"
import { useEffect } from "react"
import { getGroups } from "../../store/slices/groupsReducer"
import { useDispatch, useSelector } from "react-redux"

import SkeletonGroup from "./SkeletonGroup"

const Groups = () => {
	const dispatch = useDispatch()
	const { auth, groups } = useSelector((state) => state)
	useEffect(() => {
		dispatch(getGroups({ token: auth.token }))
	}, [])
	if (groups.loading) {
		return <SkeletonGroup />
	}
	return (
		<div className="groups">
			<div className="groups-container">
				<div className="groups-main">
					<div className="groups__search-input search-input">
						<input type="text" placeholder="Найти группу" />
						<img
							src={searchImg}
							alt="Иконка поиска"
							className="groups__input-img"
						/>
					</div>

					{groups.items.map((group) => {
						return <GroupsItem key={group._id} group={group} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Groups

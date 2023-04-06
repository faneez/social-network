import React from "react"

const CategoriesVideo = ({ setActiveCategory, activeCategory }) => {
	const categories = [
		{
			title: "Все",
			name: "all",
			active: true,
		},
		{
			title: "Python",
			name: "Python",
			active: false,
		},
		{
			title: "Java",
			name: "Java",
			active: false,
		},
		{
			title: "Разработка VR/AR",
			name: "VR",
			active: false,
		},
	]
	return (
		<div className="videos__category">
			<ul className="category-list">
				{categories.map((category, index) => {
					return (
						<li
							onClick={() => {
								setActiveCategory(category.name)
							}}
							className={
								category.name == activeCategory
									? "category-list__item active"
									: "category-list__item"
							}
							key={index}
						>
							{category.title}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default CategoriesVideo

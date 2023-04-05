import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./todo.scss"
import { postDataApi } from "../../utils/fetchDataApi"
import { useSelector, useDispatch } from "react-redux"
import { createTodo, getTodos, deleteTodo } from "../../store/slices/todoSlice"
import { changeStatus } from "../../store/slices/todoSlice"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCircleCheck,
	faPen,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons"

const Todo = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getTodos({ token: auth.token }))
	}, [])
	//state
	const [toDo, setToDo] = useState([
		{
			id: 1,
			title: "Task1",
			status: false,
		},
		{
			id: 2,
			title: "Task2",
			status: false,
		},
	])
	const { auth, todos } = useSelector((state) => state)

	const [newTask, setNewTask] = useState("")
	const [isEdit, setIsEdit] = useState(false)
	const [editedTask, setEditedTask] = useState({})

	const addTask = async () => {
		if (newTask) {
			let num = toDo.length + 1
			dispatch(createTodo({ title: newTask, token: auth.token }))
			//setToDo([...toDo, { id: num, title: newTask, status: false }])
			//setNewTask("")
		}
	}

	const deleteTask = (id) => {
		const newTasks = toDo.filter((task) => task.id !== id)
		setToDo(newTasks)
	}

	const markDone = (id) => {
		const newTasks = toDo.map((task) => {
			if (task.id === id) {
				return { ...task, status: !task.status }
			} else {
				return task
			}
		})
		setToDo(newTasks)
	}

	return (
		<div>
			<h2>Список задач</h2>
			<br />
			{/* Update Task */}
			{isEdit ? (
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={editedTask.title}
							onChange={(e) => {
								setEditedTask({ ...editedTask, title: e.target.value })
							}}
							className="form-control form-control-sm"
						/>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-sm btn-success mr-20"
							// onClick={() => {
							// 	const newTasks = todos.items.map((task) => {
							// 		if (task.id === editedTask.id) {
							// 			return editedTask
							// 		} else {
							// 			return task
							// 		}
							// 	})
							// 	setToDo(newTasks)
							// 	setIsEdit(false)
							// }}
						>
							Обновить
						</button>
						<button
							className="btn btn-sm btn-warning"
							onClick={() => setIsEdit(false)}
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				<div className="row">
					<div className="col">
						<input
							type="text"
							className="form-control form-control-sm"
							value={newTask}
							onChange={(e) => {
								setNewTask(e.target.value)
							}}
						/>
					</div>
					<div className="col-auto">
						<button className="btn btn-success btn-sm " onClick={addTask}>
							Добавить
						</button>
					</div>
				</div>
			)}

			<br />
			{/* Add Task */}

			<br />
			{todos.items && todos.items.length ? "" : "Нет задач"}

			{todos.items &&
				todos.items.map((task, index) => {
					return (
						<React.Fragment key={task.id}>
							<div className="col taskBg">
								<div className={task.status ? "done" : ""}>
									<span className="taskNumber">{index + 1}</span>
									<div className="taskText">{task.title}</div>
								</div>
								<div className="iconsWrap">
									<span title="Выполнена / Не выполнена">
										<FontAwesomeIcon
											icon={faCircleCheck}
											onClick={() => {
												dispatch(
													changeStatus({
														id: task._id,
														token: auth.token,
														status: !task.status,
													})
												)
											}}
										/>
									</span>
									{task.status ? null : (
										<span
											title="Редактировать"
											onClick={() => {
												setIsEdit(true)
												setEditedTask(task)
											}}
										>
											<FontAwesomeIcon icon={faPen} />
										</span>
									)}

									<span title="Удалить">
										<FontAwesomeIcon
											icon={faTrashCan}
											onClick={() => {
												dispatch(
													deleteTodo({ id: task._id, token: auth.token })
												)
											}}
										/>
									</span>
								</div>
							</div>
						</React.Fragment>
					)
				})}
		</div>
	)
}

export default Todo

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Loading from "../Loading/Loading"
import Toast from "../Toast/Toast"
import "../../styles/Alert.css"
import { sendAlert } from "../../store/slices/alertSlice"

const Alert = () => {
	const { alert } = useSelector((state) => state)
	const dispatch = useDispatch()

	const close = () => {
		dispatch(sendAlert({}))
	}

	return (
		<div className="alert">
			{alert.loading && <Loading />}
			{alert.error && (
				<Toast
					msg={{ title: "Error", body: alert.error }}
					bgColor="rgb(172, 15, 15)"
					handleShow={close}
				/>
			)}
			{alert.success && (
				<Toast
					msg={{ title: "Success", body: alert.success }}
					bgColor="rgb(15, 236, 100)"
					handleShow={close}
				/>
			)}
		</div>
	)
}

export default Alert

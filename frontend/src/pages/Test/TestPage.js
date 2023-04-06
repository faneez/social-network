import React, { useState } from "react"
import { Game } from "../../components/Test/Test"
import "../../components/Test/test.scss"

function TestPage() {
	const [testName, setTestName] = useState()
	return (
		<div className="test-container">
			<div className="test-container__title">
				<h2>Прохождение теста "{testName}"</h2>
			</div>
			<div className="Test">
				<Game setTestName={setTestName} />
			</div>
		</div>
	)
}

export default TestPage

import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { socket } from "../api"
import "./home.css"

const Home = ({ history }) => {
	const [val, setVal] = useState("")

	const onChange = e => {
		setVal(e.target.value)
	}

	const globalClick = e => {
		e.preventDefault()
		socket.emit("join global", { room: "global", name: val })
		history.push("/play")
	}

	return (
		<div className="container">
			<input className="name-input" type="text" value={val} onChange={e => onChange(e)} />
			<button className="join-global" type="submit" onClick={e => globalClick(e)}>
				Join!
			</button>
			<button className="join-private" type="submit">
				Create Private Room
			</button>
		</div>
	)
}

export default withRouter(Home)

import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { socket } from "../api"
import "./home.css"
import { Button } from 'reactstrap';

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
			<Button color="primary" className="join-global" type="submit" onClick={e => globalClick(e)}>
				Join
			</Button>
			<Button color="primary" className="join-private" type="submit">
				Create Private Room
			</Button>
		</div>
	)
}

export default withRouter(Home)

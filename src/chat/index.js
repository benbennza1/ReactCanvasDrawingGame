import React, { useState, useEffect } from "react"
import { socket } from "../api"
import "./chat.css"
import UserList from "./user-list"
import ChatInput from "./chat-input"
import ChatHistory from "./chat-history"

const Chat = () => {
	// initialize
	const [initialize, setInitialize] = useState({
		name: "",
		room: "",
	})

	// chat
	const [val, setVal] = useState("")
	const [msg, setMsg] = useState([])
	const [users, setUsers] = useState([])

	const onChange = e => {
		setVal(e.target.value)
	}

	const onKeyUp = e => {
		if (e.keyCode === 13) {
			socket.emit("newMsg", val)
			setVal("")
		}
	}

	socket.on("global-joinMsg", data => alert(data))
	socket.on("receiveMsg", data => setMsg(data))
	socket.on("users list", data => {
		setUsers(data)
	})

	useEffect(() => {
		socket.on("getMsg", data => setMsg(data))

		socket.on("initialize", data => {
			setInitialize({
				...data,
			})
		})

		socket.on("users list", data => {
			setUsers(data)
		})
	}, [])

	return (
		<div className="box">
			<div>
				<h5>Room: {initialize.room}
				</h5>
			</div>
			<div className="users">
				<UserList initialize={initialize} users={users} />
			</div>
			<div className="chat-history">
				<ChatHistory msg={msg} />
			</div>
			<div className="chat-input">
				<ChatInput value={val} onChange={onChange} onKeyUp={onKeyUp} />
			</div>
		</div>
	)
}

export default Chat

import React, { useState, useEffect } from "react"
import { socket } from "../api"

const listStyle = {
	listStyleType: "none",
}

const UserList = ({ initialize, users, ...props }) => {
	const usersList = users.map(user => {
		if (user.name !== initialize.name) {
			return <li>{user.name}</li>
		}
	})
	return (
		<ul style={{ ...listStyle }}>
			<li>(You) {initialize.name}</li>
			{usersList}
		</ul>
	)
}

export default UserList

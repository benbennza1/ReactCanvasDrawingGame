import React from "react"

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

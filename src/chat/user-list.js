import React from "react"
import { BlockPicker } from "react-color"
import { ListGroup, ListGroupItem, Badge,Table } from "reactstrap"

const listStyle = {
	listStyleType: "none",
}

const listItemStyle = {
	display: "inline-block",
}

const UserList = ({ initialize, users, ...props }) => {
	const usersList = users.map(user => {
		if (user.name !== initialize.name) {
			return <tr><td>{user.name}</td><td><Badge pill>0</Badge></td></tr>
		}
	})
	return (
		
		// <ul style={{ ...listStyle }}>
		// 	<li style={{ ...listItemStyle }}>(You) {initialize.name}</li>
		// 	{usersList}
		// </ul>
		<Table>
			{/* <thead>
				<tr>
					<th>Users</th>
					<th></th>
				</tr>
			</thead> */}
			<tbody>
				<tr>
					<td>(You)</td>
					<td><Badge pill>0</Badge></td>
				</tr>
				{usersList}
			</tbody>
		</Table>
	)
}

export default UserList

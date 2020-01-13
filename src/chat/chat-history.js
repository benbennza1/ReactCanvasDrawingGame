import React from "react"

const ulStyle = {
	listStyleType: "none",
}

const msgStyle = {
	margin: "5px",
	backgroundColor: "lightgrey",
}

const chatHistory = ({ msg, ...props }) => {
	return (
		<ul style={{ ...ulStyle }}>
			{msg.map(msg => (
				<li style={{ ...msgStyle }}>{msg}</li>
			))}
		</ul>
	)
}

export default chatHistory

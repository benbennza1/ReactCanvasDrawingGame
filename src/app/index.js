import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home"
import Canvas from "../canvas"
import Chat from "../chat"
import Room from "../room"

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/play">
					<Room />
					<Canvas />
					<Chat />
				</Route>
			</Switch>
		</Router>
	)
}

export default App

import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home"
import Canvas from "../canvas"
import Chat from "../chat"
import Header from "../header"

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Header/>
					<Home />
				</Route> 
				<Route exact path="/play">
					<Header/> 
					<Canvas />
					<Chat />
				</Route>
			</Switch>
		</Router>
	)
}

export default App

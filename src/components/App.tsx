import React from "react"
import { User } from "../model/Model"
import { AuthService } from "../services/AuthService"
import { Login } from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Home } from "./Home"
import { Profile } from "./Profile"
import { Spaces } from "./spaces/Spaces"
import history from "../utils/history"
import { DataService } from "../services/DataService"

interface AppState {
	user: User | undefined
}

interface AppProps {}

export class App extends React.Component<{}, AppState> {
	private authService: AuthService = new AuthService()
	private dataService: DataService = new DataService()

	constructor(props: AppProps) {
		super(props)
		this.setUser = this.setUser.bind(this)
		//se tiene que inicializar el estado del compoente App, se puede hacer dentri del constructor
		this.state = {
			user: undefined,
		}
	}

	private setUser = (user: User) => {
		this.setState({ user })
	}

	render() {
		//	console.log(history.location, "history.location")
		return (
			<>
				<div className="wrapper">
					<BrowserRouter>
						<div>
							<Navbar user={this.state.user} />
							<Routes location={history.location}>
								<Route
									path="/login"
									element={<Login authService={this.authService} setUser={this.setUser} />}
								/>
								<Route
									path="/profile"
									element={<Profile authService={this.authService} user={this.state.user} />}
								/>

								<Route path="/" element={<Home />} />

								<Route path="/spaces" element={<Spaces dataService={this.dataService} />} />
							</Routes>
						</div>
					</BrowserRouter>
				</div>
			</>
		)
	}
}

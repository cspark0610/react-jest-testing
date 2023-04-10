import * as React from "react"
import { SyntheticEvent } from "react"
import { User } from "../model/Model"
import { AuthService } from "../services/AuthService"
import history from "../utils/history"

interface LoginProps {
	authService: AuthService
	setUser: (user: User) => void
}

interface LoginState {
	userName: string
	password: string
	loginAttempted: boolean
	loginSuccessful: boolean
}

interface CustomEvent {
	target: HTMLInputElement
}

export class Login extends React.Component<LoginProps, LoginState> {
	// inicializar el estado del componente Login y asignarle valores por defecto LoginState
	state: LoginState = {
		userName: "",
		password: "",
		loginAttempted: false,
		loginSuccessful: false,
	}

	// funciones asociadas a eventos , que tipos de eventos hay ?,
	// escribo sobre cada input, y se hace click en el boton Login

	/**
	 *
	 * @param event
	 * la funcion setUserName se ejecuta cuando se escribe en el input de userName
	 * se asocia a la propiedad onChange del elemento <input onChange={}>
	 * se llama a la funcion setState() nativo de React para actualizar el estado del componente
	 */
	private setUserName(event: CustomEvent) {
		this.setState({ userName: event.target.value })
	}

	private setPassword(event: CustomEvent) {
		this.setState({ password: event.target.value })
	}

	/**
	 *
	 * @param event : SyntheticEvent
	 * se asocia este handler a la etiqueta <form onSubmit=e => {this.handleSubmit(e)}>
	 * se llama a la funcion handleSubmit() cuando se hace click en el input Login, type="submit"
	 */
	private async handleSubmit(event: SyntheticEvent) {
		event.preventDefault()
		this.setState({ loginAttempted: true })
		const resultUser = await this.props.authService.login(this.state.userName, this.state.password)

		if (resultUser) {
			this.setState({ loginSuccessful: true })
			this.props.setUser(resultUser)
			history.push("/profile")
		} else {
			this.setState({ loginSuccessful: false })
		}
	}

	render() {
		const renderLoginMessage = () => {
			let loginMessage: any
			if (this.state.loginAttempted) {
				if (this.state.loginSuccessful) {
					loginMessage = <label>Login Successful</label>
				} else {
					loginMessage = <label>Login Failed</label>
				}
			}
			return loginMessage
		}

		return (
			<div>
				<h2>Please Login</h2>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="text" value={this.state.userName} onChange={(e) => this.setUserName(e)} />
					<br />
					<input type="password" value={this.state.password} onChange={(e) => this.setPassword(e)} />
					<br />
					<input type="submit" value="Login" />
				</form>
				{renderLoginMessage()}
			</div>
		)
	}
}

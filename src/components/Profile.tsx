import { Component } from "react"
import { Link } from "react-router-dom"
import { User, UserAttribute } from "../model/Model"
import { AuthService } from "../services/AuthService"

interface ProfileProps {
	user: User | undefined
	authService: AuthService
}

interface ProfileState {
	userAttributes: UserAttribute[]
}

export class Profile extends Component<ProfileProps, ProfileState> {
	// hay que inicializar el estado inicial del componente Profile, tb se puede hacer dentro del constructor
	state: ProfileState = {
		userAttributes: [],
	}

	// hay que hacer un override del la variable state, cuando el componente se monta por primera vez, se hace con el metodo componnentDidMount
	async componentDidMount() {
		if (this.props.user) {
			const userAttributes = await this.props.authService.getUserAttributes(this.props.user)
			// una vez que recibimos la rta del metodo getUserAttributes, se actualiza el estado del componente Profile
			this.setState({ userAttributes })
		}
	}

	private renderUserAttributes = () => {
		const rows = []
		for (const userAttribute of this.state.userAttributes) {
			//tr is table row
			// for each table row tr there are two table data td (2 columns)

			rows.push(
				<tr key={userAttribute.name}>
					<td>{userAttribute.name}</td>
					<td>{userAttribute.value}</td>
				</tr>,
			)
		}
		return (
			<table>
				<tbody>{rows}</tbody>
			</table>
		)
	}

	render() {
		const { user } = this.props
		const renderUserAttributes = () => {
			let profile: JSX.Element
			if (user) {
				profile = (
					<div>
						<h3>Hello {user.userName}</h3>
						Here are your attributes:
						{this.renderUserAttributes()}
					</div>
				)
			} else {
				profile = (
					<div>
						Please <Link to="/login">Login</Link>
					</div>
				)
			}
			return profile
		}

		return (
			<div>
				Welcome Profile
				<>{renderUserAttributes()}</>
			</div>
		)
	}
}

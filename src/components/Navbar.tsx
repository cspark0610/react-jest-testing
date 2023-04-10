import { Component } from "react"
import { User } from "../model/Model"
import { Link } from "react-router-dom"

interface NavbarProps {
	user: User | undefined
}

export class Navbar extends Component<NavbarProps> {
	render() {
		const renderLoginLogout = () => {
			return this.props.user ? (
				<Link
					to="/logout"
					style={{
						float: "right",
					}}
				>
					Logout
				</Link>
			) : (
				<Link
					to="/login"
					style={{
						float: "right",
					}}
				>
					Login
				</Link>
			)
		}

		return (
			<div className="navbar">
				<Link to="/">Home</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/spaces">Spaces</Link>
				{renderLoginLogout()}
			</div>
		)
	}
}

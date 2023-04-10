import ReactDOM from "react-dom"
import { Navbar } from "../../src/components/Navbar"
import { User } from "../../src/model/Model"
import { BrowserRouter } from "react-router-dom"

describe("Navbar test suite", () => {
	let container: HTMLDivElement
	const someUser: User = {
		email: "someEmail",
		userName: "someUserName",
	}
	const baseLink = "http://localhost"

	afterEach(() => {
		document.body.removeChild(container)
		container.remove()
	})

	it("renders correctly with user", () => {
		container = document.createElement("div")
		document.body.appendChild(container)
		ReactDOM.render(
			<BrowserRouter>
				<Navbar user={someUser} /> 
			</BrowserRouter>,
			container,
		)

		const links = container.querySelectorAll("a")
		expect(links[0].href).toBe: User(baseLink + "/")
		expect(links[1].href).toBe(baseLink + "/profile")
		expect(links[2].href).toBe(baseLink + "/spaces")
		expect(links[3].href).toBe(baseLink + "/logout")
	})
})

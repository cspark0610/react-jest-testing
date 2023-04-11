import ReactDOM from "react-dom"
import { Navbar } from "../../src/components/Navbar"
import { User } from "../../src/model/Model"

describe("Navbar test suite", () => {
	let container: HTMLDivElement
	const someUser: User = {
		email: "someEmail",
		userName: "someUserName",
	}
	const baseLink = "http://localhost"

	function renderElement(element: React.FunctionComponentElement<any>) {
		container = document.createElement("div")
		document.body.appendChild(container)
		ReactDOM.render(element, container)
	}

	afterEach(() => {
		document.body.removeChild(container)
		container.remove()
	})

	// xit("renders correctly with user", () => {
	// 	container = document.createElement("div")
	// 	document.body.appendChild(container)
	// 	ReactDOM.render(<Navbar />, container)

	// 	const links = container.querySelectorAll("a")
	// 	expect(links[0].href).toBe(baseLink + "/")
	// 	expect(links[2].href).toBe(baseLink + "/spaces")
	// 	expect(links[3].href).toBe(baseLink + "/logout")
	// })
})

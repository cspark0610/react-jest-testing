import React from "react"
import ReactDOM from "react-dom"
import { fireEvent, waitFor } from "@testing-library/react"
import { Login } from "../../src/components/Login"
import { AuthService } from "../../src/services/AuthService"
import { User } from "../../src/model/Model"
import history from "../../src/utils/history"

describe("Login compoment test suite", () => {
	let container: HTMLDivElement

	const userMock: User = {
		userName: "mock-username",
		email: "email@mail.com",
	}

	const authServiceMock: AuthService = {
		login: jest.fn(),
		getUserAttributes: jest.fn(),
	}

	const setUserMock = jest.fn()

	const historyMock = history
	historyMock.push = jest.fn()

	beforeEach(() => {
		container = document.createElement("div")
		document.body.appendChild(container)
		ReactDOM.render(<Login authService={authServiceMock} setUser={setUserMock} />, container)

		// react v 18, types error with using createRoot method
		//ReactDOM.createRoot(container).render(<Login authService={authServiceMock} setUser={setUserMock} />)
	})

	afterEach(() => {
		// luego de la ejecucion de cada test quiero remover el componente del ReactDOM, y que jest elimine todos los mocks
		document.body.removeChild(container)
		container.remove()
		jest.clearAllMocks()
	})

	it("should render correctly container with all childs, in first rendering", () => {
		const form = container.querySelector("form")
		expect(form).toBeInTheDocument()

		const title = container.querySelector("h2")
		expect(title!.textContent).toBe("Please Login")

		const inputsValues = container.querySelectorAll("input")
		expect(inputsValues).toHaveLength(3)
		expect(inputsValues[0].value).toBe("")
		expect(inputsValues[1].value).toBe("")
		expect(inputsValues[2].value).toBe("Login")

		const label = document.querySelector("label")
		expect(label).not.toBeInTheDocument()
	})

	it("should passes login credentials correctly", () => {
		const inputsValues = container.querySelectorAll("input")
		const userNameInput = inputsValues[0]
		const passwordInput = inputsValues[1]
		const loginInput = inputsValues[2]

		//simular el evento onChange del input userName y password
		fireEvent.change(userNameInput, { target: { value: "mock-username" } })
		fireEvent.change(passwordInput, { target: { value: "mock-password" } })
		//simular el evento onCLick del input login
		fireEvent.click(loginInput)

		expect(authServiceMock.login).toHaveBeenCalledWith("mock-username", "mock-password")
	})

	it("handles correctly authService async login fn", async () => {
		authServiceMock.login = jest.fn().mockResolvedValue(userMock)
		const inputsValues = container.querySelectorAll("input")
		const userNameInput = inputsValues[0]
		const passwordInput = inputsValues[1]
		const loginInput = inputsValues[2]

		//simular el evento onChange del input userName y password
		fireEvent.change(userNameInput, { target: { value: "mock-username" } })
		fireEvent.change(passwordInput, { target: { value: "mock-password" } })
		//simular el evento onCLick del input login
		fireEvent.click(loginInput)

		// esperar a que se renderice el label (de forma asincrona)
		const statusLabel = await waitFor(() => container.querySelector("label"))
		expect(statusLabel).toBeInTheDocument()
	})
})

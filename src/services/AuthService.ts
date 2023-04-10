import { User, UserAttribute } from "../model/Model"

export class AuthService {
	public async login(userName: string, password: string): Promise<User | undefined> {
		console.log(`AuthService.login() called with userName: ${userName} and password: ${password}`)
		if (userName === "test" && password === "1234") {
			return {
				userName: "test",
				email: "a@test.com",
			}
		} else {
			return undefined
		}
	}

	public async getUserAttributes(user: User): Promise<UserAttribute[]> {
		console.log(`AuthService.getUserAttributes() called with user: ${user}`)
		const result: UserAttribute[] = []
		result.push({
			name: "name description",
			value: "best user ever",
		})
		result.push({
			name: "job",
			value: "engineer",
		})
		result.push({
			name: "age",
			value: "25",
		})
		result.push({
			name: "experience",
			value: "3 years",
		})
		return result
	}
}

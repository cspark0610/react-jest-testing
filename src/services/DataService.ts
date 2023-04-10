import { Space } from "../model/Model"

export class DataService {
	public async getSpaces(): Promise<Space[]> {
		const spaces: Space[] = []

		spaces.push({
			location: "Brisbane",
			name: "Brisbane",
			spaceId: "123",
		})

		spaces.push({
			location: "Brisbane",
			name: "Brisbane",
			spaceId: "124",
		})

		spaces.push({
			location: "Brisbane",
			name: "Brisbane",
			spaceId: "125",
		})
		return spaces
	}

	public async reserveSpace(spaceId: string): Promise<string | undefined> {
		if (spaceId === "123") {
			return "5555"
		} else {
			return undefined
		}
	}
}

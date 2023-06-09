import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
	roots: ["<rootDir>/test", "<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	testEnvironment: "jsdom",
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/services/**", "!src/react-app-env.d.ts"],
}

export default config

import React from "react"
import { Navbar } from "../../src/components/Navbar"
import { create } from "react-test-renderer"

describe("Navbar component snapshot testing", () => {
	test("initial test", () => {
		const snap = create(<Navbar user={{} as any} />)
		expect(snap).toMatchSnapshot()
	})
})

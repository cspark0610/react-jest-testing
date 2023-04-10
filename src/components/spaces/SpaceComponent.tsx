import React, { Component } from "react"
import "./SpaceComponent.css"

interface SpaceComponentProps {
	spaceId: string
	name: string
	location: string
	photoUrl?: string
	reserveSpace: (spaceId: string) => void
}

// componente presentacional unicamente
export class SpaceComponent extends Component<SpaceComponentProps> {
	private renderImage(): JSX.Element {
		if (this.props.photoUrl) {
			return <img src={this.props.photoUrl} alt={this.props.name} />
		} else {
			return <img src={require("../../assets/generic-building.jpg")} alt={this.props.name} />
		}
	}

	private reserveSpace() {
		console.log("Reserve space triggered")
	}

	render() {
		return (
			<div className="spaceComponent">
				{this.renderImage()}
				<label className="name">{this.props.name}</label>
				<label className="spaceId">{this.props.spaceId}</label>
				<label className="location">{this.props.location}</label>
				<button onClick={() => this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
			</div>
		)
	}
}

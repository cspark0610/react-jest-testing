import React, { Component } from 'react';
import { Space } from '../../model/Model';
import { DataService } from '../../services/DataService';
import { SpaceComponent } from './SpaceComponent';
import { ConfirmModalComponent } from './ConfirmModalComponent';

interface SpacesState {
	spaces: Space[];
	showModal: boolean;
	modalContent: string;
}

interface SpacesProps {
	dataService: DataService;
}

export class Spaces extends Component<SpacesProps, SpacesState> {
	//inicializar el estado del componente inicial dentro del constructor
	constructor(props: SpacesProps) {
		super(props);
		this.state = {
			// inicialmente quiero que el estado del componente sea un array vacio
			spaces: [],
			showModal: false,
			modalContent: ''
		};

		this.reserveSpace = this.reserveSpace.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	async componentDidMount(): Promise<void> {
		const spaces = await this.props.dataService.getSpaces();
		this.setState({ spaces });
	}

	/**
	 * @param spaceId
	 * ES NECESARIO QUE ESTA FUNCION SEA BINDEADA EN EL CONSTRUCTOR pra que el callback funcione
	 */
	private async reserveSpace(spaceId: string) {
		console.log('Reserve space triggered in Spaces component');
		const result = await this.props.dataService.reserveSpace(spaceId);
		if (result) {
			this.setState({
				showModal: true,
				modalContent: `You reserved the space with id ${spaceId} and got the reservation number ${result}`
			});
		} else {
			this.setState({
				showModal: true,
				modalContent: `You cannot reserve the space with id: ${spaceId}`
			});
		}
	}

	private renderSpaces() {
		const rows = [];
		for (const space of this.state.spaces) {
			rows.push(
				<SpaceComponent
					location={space.location}
					name={space.name}
					spaceId={space.spaceId}
					reserveSpace={this.reserveSpace}
				/>
			);
		}
		return rows;
	}

	/**
	 * DEBE SER BINDEADO EN EL CONSTRUCTOR PARA QUE EL CALLBACK FUNCIONE
	 */
	private closeModal() {
		this.setState({ showModal: false, modalContent: '' });
	}

	render() {
		return (
			<div>
				<h2>Welcome to Spaces page</h2>
				{this.renderSpaces()}
				<ConfirmModalComponent
					close={this.closeModal}
					content={this.state.modalContent}
					show={this.state.showModal}
				/>
			</div>
		);
	}
}
